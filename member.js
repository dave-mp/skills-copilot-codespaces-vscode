function skillsMember() {
  var member = {
    skills: ['JavaScript', 'React', 'Node', 'Python', 'MongoDB'],
    getSkills: function() {
      this.skills.forEach(function(skill) {
        console.log(`${this.name} knows ${skill}`);
      });
    }
  };
  member.getSkills();
}