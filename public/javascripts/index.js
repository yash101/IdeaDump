;var pub = pub || {};
(function init() {
	$(document).ready(function ready() {
		pub.registerForm();
	});

	var formMethod = 1;
	pub.logInForm = function logInForm() {
		var form = $("body .text-align-center");
		form.empty();

		var newForm = $("#form-templates > #login").clone(true);
		newForm.attr("id", "authentication-pane");
		form.append(newForm);

		formMethod = 1;
	};
	pub.registerForm = function registerForm() {
		var form = $("body .text-align-center");
		form.empty();

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

	pub.submitAuthenticationForm = function submitAuthenticationForm() {
	};
})();