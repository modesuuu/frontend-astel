import React, { useState } from 'react'

const FormSkillSelect = ({ selectedSkills, availableSkills, loadingSkills, toggleSkill }) => {
    const [skillToAdd, setSkillToAdd] = useState("");

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Skills</h2>

            <div className="space-y-4">
                <select
                    value={skillToAdd}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) return;
                        toggleSkill(selectedId);
                        setSkillToAdd("");
                    }}
                    disabled={loadingSkills || availableSkills.length === 0}
                    className="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                    <option value="">
                        {loadingSkills
                            ? "Loading all master skills..."
                            : availableSkills.length === 0
                                ? "No skill options available"
                                : "Add a new skill..."}
                    </option>
                    {availableSkills.map((skill) => (
                        <option
                            key={skill._id}
                            value={skill._id}
                            disabled={selectedSkills.includes(skill._id)}
                        >
                            {skill.name}
                        </option>
                    ))}
                </select>

                {/* Badge List Active Skills */}
                <div className="flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? (
                        selectedSkills.map((skillId) => {
                            const skill = availableSkills.find((item) => item._id === skillId);
                            if (!skill) return null;

                            return (
                                <span
                                    key={skillId}
                                    className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 px-3 py-1.5 text-xs font-semibold text-primary dark:text-indigo-400 animate-fade-in"
                                >
                                    <span>{skill.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => toggleSkill(skillId)}
                                        className="text-primary hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors text-sm font-bold focus:outline-none cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </span>
                            );
                        })
                    ) : (
                        <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                            No skills selected yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FormSkillSelect