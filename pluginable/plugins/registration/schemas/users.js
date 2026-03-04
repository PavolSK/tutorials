NEWSCHEMA('@Users', '*firstname,*lastname,email:Email,phone:Phone,issuper:Boolean');

NEWACTION('Users|list', {
	route: '+API ?',
	permissions: 'registration',
	action: function($) {
		DATA.list('tbl_user').autoquery($.query, 'id,firstname,lastname,email,phone,updatedby,issuper,dtcreated,dtupdated', 'dtcreated_desc', 100).callback($);
	}
});

NEWACTION('Users|read', {
	route: '+API ?',
	input: '*id:UID',
	permissions: 'registration',
	action: async function($, model) {
		DATA.read('tbl_user').fields('id,firstname,lastname,email,phone,updatedby,issuper,dtcreated,dtupdated').id(model.id).error(404).callback($);
	}
});

NEWACTION('Users|create', {
	route: '+API ?',
	input: '@Users',
	permissions: 'registration',
	action: async function($, model) {

		model.id = UID();
		model.dtcreated = NOW;

		DATA.insert('tbl_user', model).callback($.done(model.id));
	}
});

NEWACTION('Users|update', {
	route: '+API ?',
	input: '*id:UID,@Users',
	permissions: 'registration',
	action: function($, model) {

		model.updatedby = $.user.name;
		model.dtupdated = NOW;

		DATA.modify('tbl_user', model).id(model.id).error(404).callback($.done(model.id));
	}
});

NEWACTION('Users|remove', {
	route: '+API ?',
	input: '*id:UID',
	permissions: 'registration',
	action: function($, model) {
		DATA.remove('tbl_user').id(model.id).error(404).callback($.done(model.id));
	}
});