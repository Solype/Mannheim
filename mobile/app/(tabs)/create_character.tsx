import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReligionForm from '@/components/ReligionForm';
import SkillForm from '@/components/SkillForm';
import AttributesForm from '@/components/AttributesForm';
import BasicForm from '@/components/BasicInfoForm';
import PriorityForm from '@/components/PriorityForm';
import ListStringForm from '@/components/ListStringForm';
import { Religion, Skill, getDefaultAttributes, Attributes, Priority, CharacterOtherInfo, BasicCharaInfo } from '@/types/character_types';
import CharacterModificationUtils from '@/services/CharacterModificationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateCharacterPage = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [religion, setReligion] = useState<Religion[]>([]);
    const [attributes, setAttributes] = useState<Attributes>(getDefaultAttributes());
    const [mainRoles, setMainRoles] = useState<string[]>([]);
    const [secondaryRoles, setSecondaryRoles] = useState<string[]>([]);
    const [otherInfos, setOtherInfos] = useState<CharacterOtherInfo>({ languages: [], experience: 0, mana: 0, money: 0 });
    const [infos, setBasicInfo] = useState<BasicCharaInfo>({ name: "", age: 0, race: "", gender: "" });
    const [priority, setPriority] = useState<Priority>({ role: "", attribute: "", skills: "", money: "" });
    const navigation = useNavigation();

    const saveReligion = (religion: Religion[]) => {
        AsyncStorage.setItem('religion', JSON.stringify(religion));
        setReligion(religion);
    }

    const saveAttributes = (attributes: Attributes) => {
        AsyncStorage.setItem('attributes', JSON.stringify(attributes));
        setAttributes(attributes);
    }

    const saveMainRoles = (mainRoles: string[]) => {
        AsyncStorage.setItem('mainRoles', JSON.stringify(mainRoles));
        setMainRoles(mainRoles);
    }

    const saveSecondaryRoles = (secondaryRoles: string[]) => {
        AsyncStorage.setItem('secondaryRoles', JSON.stringify(secondaryRoles));
        setSecondaryRoles(secondaryRoles);
    }

    const saveLanguages = (languages: string[]) => {
        AsyncStorage.setItem('languages', JSON.stringify(languages));
        setOtherInfos({ ...otherInfos, languages: languages });
    }

    const saveBasicInfo = (infos: BasicCharaInfo) => {
        AsyncStorage.setItem('infos', JSON.stringify(infos));
        setBasicInfo(infos);
    }

    const savePriority = (priority: Priority) => {
        AsyncStorage.setItem('priority', JSON.stringify(priority));
        setPriority(priority);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const religionData = await AsyncStorage.getItem('religion');
                setReligion(religionData ? JSON.parse(religionData) : []);
    
                const attributesData = await AsyncStorage.getItem('attributes');
                setAttributes(attributesData ? JSON.parse(attributesData) : getDefaultAttributes());
    
                const mainRolesData = await AsyncStorage.getItem('mainRoles');
                setMainRoles(mainRolesData ? JSON.parse(mainRolesData) : []);
    
                const secondaryRolesData = await AsyncStorage.getItem('secondaryRoles');
                setSecondaryRoles(secondaryRolesData ? JSON.parse(secondaryRolesData) : []);
    
                const otherInfosData = await AsyncStorage.getItem('languages');
                setOtherInfos(otherInfosData ? JSON.parse(otherInfosData) : { languages: [], experience: 0, mana: 0, money: 0 });
    
                const basicInfoData = await AsyncStorage.getItem('infos');
                setBasicInfo(basicInfoData ? JSON.parse(basicInfoData) : { name: '', age: 0, race: '', gender: '' });
    
                const priorityData = await AsyncStorage.getItem('priority');
                setPriority(priorityData ? JSON.parse(priorityData) : { role: '', attribute: '', skills: '', money: '' });
            } catch (error) {
                console.error('Error reading AsyncStorage:', error);
            }
        };
    
        fetchData();
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
        const data = {
            skills,
            religion,
            attributes,
            roles: { main: mainRoles, secondary: secondaryRoles },
            other: { ...otherInfos },
            infos,
            priority
        };
        console.log(data);
        CharacterModificationUtils.createCharacter(data);
        navigation.navigate('characters');
    }

    const reinitializeAsyncStorage = () => {
        AsyncStorage.removeItem('skills');
        AsyncStorage.removeItem('religion');
        AsyncStorage.removeItem('attributes');
        AsyncStorage.removeItem('mainRoles');
        AsyncStorage.removeItem('secondaryRoles');
        AsyncStorage.removeItem('languages');
        AsyncStorage.removeItem('infos');
        AsyncStorage.removeItem('priority');
        setSkills([]);
        setReligion([]);
        setAttributes(getDefaultAttributes());
        setMainRoles([]);
        setSecondaryRoles([]);
        setOtherInfos({ languages: [], experience: 0, mana: 0, money: 0 });
        setBasicInfo({ name: "", age: 0, race: "", gender: "" });
        setPriority({ role: "", attribute: "", skills: "", money: "" });
    }

    return (
        <ImageBackground
            source={require('@/assets/drag.png')}
            style={styles.background}
        >
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Créer un personnage</Text>
                <View style={styles.buttons}>
                    <Button title="Réinitialiser" onPress={reinitializeAsyncStorage} />
                    <Button title="Sauvegarder" onPress={handleSubmit} />
                </View>
                <View style={styles.formContainer}>
              <BasicForm formData={infos} setFormData={saveBasicInfo} disabled={false} />
    
                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <PriorityForm initialPriority={priority} onSubmit={savePriority} disabled={false} />
                    </View>
                    <View style={styles.halfWidth}>
                    <AttributesForm attributes={attributes} setter={saveAttributes} disabled={false} />
                    </View>
                </View>
        
                <View style={{ flex: 1 }}>
                    <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} disabled={false} />
                    <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} disabled={false} />
                    <ListStringForm title="Langues" setter={saveLanguages} listString={otherInfos.languages} disabled={false} />
                </View>
        
                <ReligionForm setter={saveReligion} listReligions={religion} disabled={false} />
                <SkillForm skillSetter={handleChangeSkill} skills={skills} disabled={false} />
                </View>
    
            
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Sauvegarder</Text>
              </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 20,
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

export default CreateCharacterPage;
