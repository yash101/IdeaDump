;var pub = pub || {};
(function init() {
	$(document).ready(function ready() {
		if(pub.defaultPageType == 1) {
			pub.logInForm();
		} else {
			pub.registerForm();
		}
	});

	var formMethod = 1;
	pub.logInForm = function logInForm() {
		history.pushState({}, null, "/login");

		$("body .text-align-center .pane").remove();
		var form = $("body .text-align-center");

		var newForm = $("#form-templates > #login").clone(true);
		newForm.attr("id", "authentication-pane");
		form.append(newForm);

		formMethod = 1;
	};
	pub.registerForm = function registerForm() {
		history.pushState({}, null, "/register");

		$("body .text-align-center .pane").remove();
		var form = $("body .text-align-center");

		var newForm = $("#form-templates > #register").clone(true);
		newForm.attr("id", "authentication-pane")
		form.append(newForm);

		formMethod = 2;
	};
	pub.switchForm = function switchForm() {
		if(formMethod == 1) {
			pub.registerForm();
		} else {
			pub.logInForm();
		}
	};

	pub.login = function login() {
		jQuery.post("/auth/login")
		$.ajax({
			type: "POST",
			url: "/auth/login",
			data: {
				"username": $("#authentication-pane input[name=userid]").val(),
				"password": $("#authentication-pane input[name=password]").val(),
				"remember": $("#authentication-pane input[name=remember]").val()
			},
			success: function(data) {
				var recv = JSON.parse(data);
			}
		});
	};
	pub.register = function register() {
		$.ajax({
			type: "POST",
			url: "/auth/login",
			data: {
				"email": $("#authentication-pane input[name=email]").val(),
				"password": $("#authentication-pane input[name=password]").val(),
				"confirmPassword": $("#authentication-pane input[name=repeat-password]").val()
			},
			success: function(data) {
				var recv = JSON.parse(data);
			}
		});
	};
})();