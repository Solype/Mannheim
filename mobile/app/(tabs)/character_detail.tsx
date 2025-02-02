import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView  } from 'react-native';
import ReligionForm from '@/components/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import SkillForm, { extractSkills, listSkills } from '@/components/SkillForm';
import AttributesForm from '@/components/AttributesForm';
import { Attributes, getDefaultAttributes, Priority, CharacterOtherInfo, BasicCharaInfo } from '@/types/character_types';
import BasicForm from '@/components/BasicInfoForm';
import PriorityForm from '@/components/PriorityForm';
import ListStringForm from '@/components/ListStringForm';
import CharacterModificationUtils from '@/services/CharacterModificationUtils';
import { useRoute } from '@react-navigation/native';

const CharacterViewPage = () => {
    const { params } = useRoute();
    const { id } = params || { id: "" };
    
    const [skills, setSkills] = useState<Skill[]>([]);
    const [religion, setReligion] = useState<Religion[]>([]);
    const [attributes, setAttributes] = useState<Attributes>(getDefaultAttributes());
    const [mainRoles, setMainRoles] = useState<string[]>([]);
    const [secondaryRoles, setSecondaryRoles] = useState<string[]>([]);
    const [otherInfos, setOtherInfos] = useState<CharacterOtherInfo>({ languages: [], experience: 0, mana: 0, money: 0 });
    const [infos, setBasicInfo] = useState<BasicCharaInfo>({ name: "", age: 0, race: "", gender: "" });
    const [priority, setPriority] = useState<Priority>({ role: "", attribute: "", skills: "", money: "" });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const saveReligion = (religion: Religion[]) => setReligion(religion);
    const saveAttributes = (attributes: Attributes) => setAttributes(attributes);
    const saveMainRoles = (mainRoles: string[]) => setMainRoles(mainRoles);
    const saveSecondaryRoles = (secondaryRoles: string[]) => setSecondaryRoles(secondaryRoles);
    const saveLanguages = (languages: string[]) => setOtherInfos({ ...otherInfos, languages: languages });
    const saveBasicInfo = (infos: BasicCharaInfo) => setBasicInfo(infos);
    const savePriority = (priority: Priority) => setPriority(priority);

    const loadCharacter = () => {
        if (!id) return;
        CharacterModificationUtils.getCharacter(id).then(character => {
            setSkills(extractSkills(listSkills, character.skills));
            setReligion(character.religion);
            setAttributes(character.attributes);
            setMainRoles(character.roles.main);
            setSecondaryRoles(character.roles.secondary);
            setOtherInfos(character.other);
            setBasicInfo(character.infos);
            setPriority(character.priority);
        });
    };

    useEffect(() => {
        loadCharacter();
    }, []);

    const handleChangeSkill = (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => {
        const newSkills = skills.map(skill => {
            if (skill.name === skillName && skill.category === skillCategory) {
                return { ...skill, pureValue, roleValue };
            }
            return skill;
        });
        setSkills(newSkills);
    };

    const handleSubmit = () => {
        if (!id) return;
        const data = {
            skills,
            religion,
            attributes,
            roles: { main: mainRoles, secondary: secondaryRoles },
            other: { ...otherInfos },
            infos,
            priority
        };
        CharacterModificationUtils.updateCharacter(data, id);
        setIsDisabled(true);
    };

    const reinitializeData = () => loadCharacter();

    return (
      <ImageBackground source={require('@/assets/drag.png')} style={styles.background}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
        >
          <ScrollView 
            style={styles.container} 
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <Text style={styles.header}>{infos.name}</Text>
            
            <View style={styles.buttonContainer}>
              {isDisabled ? (
                <Button title="Modifier" onPress={() => setIsDisabled(false)} color="#FF6F61" />
              ) : (
                <>
                  <Button title="Réinitialiser" onPress={reinitializeData} color="#D8BFBF" />
                  <Button title="Sauvegarder" onPress={handleSubmit} color="#FF6F61" />
                </>
              )}
            </View>
    
            <View style={styles.formContainer}>
              <BasicForm formData={infos} setFormData={saveBasicInfo} disabled={isDisabled} />
    
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <PriorityForm initialPriority={priority} onSubmit={savePriority} disabled={isDisabled} />
                </View>
                <View style={styles.halfWidth}>
                  <AttributesForm attributes={attributes} setter={saveAttributes} disabled={isDisabled} />
                </View>
              </View>
    
              <View style={{ flex: 1 }}>
                <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} disabled={isDisabled} />
                <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} disabled={isDisabled} />
                <ListStringForm title="Langues" setter={saveLanguages} listString={otherInfos.languages} disabled={isDisabled} />
              </View>
    
              <ReligionForm setter={saveReligion} listReligions={religion} disabled={isDisabled} />
              <SkillForm skillSetter={handleChangeSkill} skills={skills} disabled={isDisabled} />
            </View>
    
            {!isDisabled && (
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Sauvegarder</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }; 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    submitButton: {
        backgroundColor: '#FF6F61',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CharacterViewPage;
