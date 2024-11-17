import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

export const SimpleField = ({ label, value, type, onChange }: { label: string, value: string | number, type: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div>
            <Label>{label}</Label>
            <Input 
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
