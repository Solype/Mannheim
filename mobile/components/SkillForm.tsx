import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { dico } from "@/types/dico";
import { Skill } from "@/types/character_types";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const listSkills = {
  ranged: ["bow", "crossbow", "exoticWeapon", "smallProjectile", "pistol"],
  artillery: ["cannon", "engine"],
  melee: ["polearm", "exoticWeapon", "blunt", "shortBlade", "sword", "axe", "saber", "bareHands"],
  protective: ["shield"],
  movement: ["acrobatics", "running", "balance", "riding", "climbing", "dodging", "swimming", "navigation", "landing", "jumping"],
  resistance: ["endurance", "mental", "pathological", "physical"],
  survival: ["lockpicking", "stealth", "manipulation", "orientalKnowledge", "fishing", "tracking", "reflex", "lifting"],
  social: ["taming", "deceit", "intimidation", "speech", "persuasion", "psychology"],
  intellect: ["anatomy_knowledge", "artistic_knowledge", "astronomy_knowledge", "biology_knowledge", "cultural_knowledge", "geography_knowledge", "warfare_knowledge", "history_knowledge", "linguistics_knowledge", "magic_knowledge", "mysticism_knowledge", "technology_knowledge", "concentration", "deduction", "memory", "observation"],
  craft: ["visualArts", "chemistry", "construction", "cooking", "explosives", "forging", "medicine", "music"],
  magic: ["alchemy", "enhancement", "annihilation", "conjuration", "elementarism", "envoutement", "enchantment", "illusionism", "summoning", "necromancy", "perception", "sealing", "witchcraft", "absorption"]
};

export async function extractSkills(listSkills: Record<string, string[]>, skillsData: Skill[] | null): Promise<Skill[]> {
  const storedSkills = skillsData ?? JSON.parse(await AsyncStorage.getItem('skills') || '[]');
  const skills: Skill[] = [];

  for (const category in listSkills) {
    if (listSkills.hasOwnProperty(category)) {
      const skillNames = listSkills[category];
      skillNames.forEach(skillName => {
        const existingSkill = storedSkills.find(
          (skill: Skill) => skill.name === skillName && skill.category === category
        );
        skills.push({
          name: skillName,
          category,
          pureValue: existingSkill ? existingSkill.pureValue : 0,
          roleValue: existingSkill ? existingSkill.roleValue : 0
        });
      });
    }
  }

  return skills;
}

interface SingleSkillFormProps {
  skillName: string;
  pureValue: number;
  roleValue: number;
  skillValueSetter: (pure: number, role: number) => void;
  disabled: boolean;
}

const SingleSkillForm = ({ skillName, pureValue, roleValue, skillValueSetter, disabled }: SingleSkillFormProps) => {
  const onPureValueChange = (value: string) => {
    console.log(value);
    const newPureValue = Number(value);
    console.log(newPureValue);
      skillValueSetter(newPureValue, roleValue);
  };

  const onRoleValueChange = (value: string) => {
    const newRoleValue = Number(value);
      skillValueSetter(pureValue, newRoleValue);
  };

  return (
    <View style={styles.skillContainer}>
    <Text style={styles.skillName}>{dico[skillName] ?? skillName}</Text>
    <View style={styles.inputContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pure</Text>
        <TextInput
          style={styles.input}
          value={pureValue.toString()}
          onChangeText={(value) => onPureValueChange(value)}
          keyboardType="numeric"
          min="0"
          editable={!disabled}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={styles.input}
          value={roleValue.toString()}
          onChangeText={(value) => onRoleValueChange(value)}
          keyboardType="numeric"
          min="0"
          editable={!disabled}
        />
      </View>
    </View>
    <Text style={styles.total}>= {pureValue + roleValue}</Text>
  </View>
  );
};

interface SkillFormProps {
  skillSetter: (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => void;
  skills: Skill[];
  disabled: boolean;
}

const SkillForm = ({ skillSetter, skills, disabled }: SkillFormProps) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Skills</Text>
      {Object.entries(listSkills).map(([category, skillNames]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{dico[category] ?? category}</Text>
          <View style={styles.skillsContainer}>
            {skillNames.map((skillName: string) => {
              const currentSkill = skills?.find(
                skill => skill.name === skillName && skill.category === category
              );
              return (
                <SingleSkillForm
                  key={skillName}
                  skillName={skillName}
                  pureValue={currentSkill?.pureValue || 0}
                  roleValue={currentSkill?.roleValue || 0}
                  skillValueSetter={(pure: number, role: number) => {
                    console.log(pure, role);
                    skillSetter(skillName, category, pure, role)
                  }
                  }
                  disabled={disabled}
                />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  skillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputGroup: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
  input: {
    width: 120,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  skillsContainer: {
    paddingVertical: 10,
  },
});

export default SkillForm;
