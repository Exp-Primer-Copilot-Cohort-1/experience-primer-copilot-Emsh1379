function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'app/views/skills/member.html',
    controller: 'SkillsMemberCtrl',
    controllerAs: 'skillsMemberCtrl',
    bindToController: true,
    scope: {
      member: '='
    }
  };
}
  