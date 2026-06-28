export default function useMappingSkills(skills) {
  return skills.map((skill) => {
    return {
      _id: skill._id,
      name: skill.skillName,
    };
  });
}