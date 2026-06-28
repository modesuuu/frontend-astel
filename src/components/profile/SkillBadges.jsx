
const SkillBadges = ({ skills }) => {
  const defaultSkills = [
    "Coding",
    "Coding",
    "Coding",
    "Coding",
    "Coding",
    "Coding",
    "Coding",
    "Coding",
  ];
  const activeSkills = skills || defaultSkills;
  console.log(skills);
  console.log("activeSkills", Array.isArray(skills));

  return (
    <div className="flex flex-col gap-2 items-end mt-4">
      <span className="text-base font-medium text-gray-400 flex items-center gap-1">
        Skills <i className="bx bx-pencil-sparkles"></i>
      </span>
      <div className="flex flex-wrap gap-2 justify-end max-w-md">
        {activeSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40  text-primary text-xs font-medium"
          >
            <i className="text-base opacity-60 bx bx-code"></i>
            <span>{skill.skillName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBadges;
