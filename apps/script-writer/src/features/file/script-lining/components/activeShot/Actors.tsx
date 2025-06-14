// components/Actors.jsx
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

import avatar from '@/assets/script-lining/character.svg'

// Sample Data
const actors = [
    { name: 'Emily Johnson luiiyluihi gyuujhkjh', code: '001', avatar: avatar },
    { name: 'Michael Anderson', code: '002', avatar: avatar },
    { name: 'Olivia Rodriguez', code: '003', avatar: avatar },
    { name: 'Daniel Baker', code: '004', avatar: avatar },
    { name: 'Sophia Carter', code: '005', avatar: avatar },
    { name: 'Ethan Miller', code: '006', avatar: avatar },
    { name: 'Ava Turner', code: '007', avatar: avatar },
    { name: 'Benjamin Foster', code: '008', avatar: avatar },
];

const Actors = () => {
    return (
        <section className="p-4 mt-6 border border-gray-400 rounded-2xl">
            <div className="flex flex-row justify-between items-start mb-3">
                <h2 className="font-semibold text-black">Actors</h2>
                <button className="max-w-fit flex flex-row items-center gap-1 px-4 py-2.5 text-sm border border-gray-400 rounded-full hover:bg-gray-100 transition">
                    {/* @ts-ignore */}
                    Add Characters <FaPlus />
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {actors.map((actor, index) => (
                    <CharacterCard
                        key={index}
                        name={actor.name}
                        code={actor.code}
                        avatar={actor.avatar}
                    />
                ))}
            </div>
        </section>
    );
};

const CharacterCard = ({ avatar, name, code }: { avatar: string; name: string; code: string }) => {
    return (
        <div className="flex items-center justify-start gap-2 p-3 border rounded-full hover:bg-gray-100 border-gray-400">
            <img
                src={avatar}
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col text-sm leading-tight">
                <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-40">
                    {name}
                </span>
                <span className="text-xs text-gray-600">{code}</span>
            </div>
        </div>
    );
};

export default Actors;
