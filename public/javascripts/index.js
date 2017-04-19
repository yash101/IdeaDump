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
		$("body .text-align-center .pane").remove();
		var form = $("body .text-align-center");

		var newForm = $("#form-templates > #login").clone(true);
		newForm.attr("id", "authentication-pane");
		form.append(newForm);

		formMethod = 1;
	};
	pub.registerForm = function registerForm() {
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

	pub.submitAuthenticationForm = function submitAuthenticationForm() {
	};
})();