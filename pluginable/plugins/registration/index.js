exports.icon = 'ti ti-user';
exports.name = '@(Registration)';
exports.position = 1;
exports.permissions = [{ id: 'registration', name: 'Registration' }];
exports.visible = user => user.sa || user.permissions.includes('registration');