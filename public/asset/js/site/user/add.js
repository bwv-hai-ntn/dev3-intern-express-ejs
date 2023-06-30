$(function() {
    /**
     * Page load
     */
    $(document).ready(function () {
        formValidation();
    });
    
    /**
     * Form validation
     */
    function formValidation() {
        $('#addFrm').validate({
            lang: 'ja',
            errorElement: 'span',
            errorClass: 'mf-5 text-danger align-middle d-block',
            onkeyup: function(element) {$(element).valid()},
            rules: {
                username: {
                    required: true,
                    maxlength: 50,
                },
                fullName: {
                    required: true,
                    maxlength: 50
                },
                password: {
                    required: true,
                    maxlength: 255
                },
                rePassword: {
                    required: true,
                    maxlength: 255,
                    matchPassword: true
                },
                role: {
                    required: true
                }
            },
            messages: {
                username: {
                    required:  `${messages.E001('Username')}`,
                    maxlength: function(meta, element) {return validMaxLengthMessage('Email', meta, element)}
                },
                fullName: {
                    required: `${messages.E001('Fullname')}`,
                    maxlength: function(meta, element) {return validMaxLengthMessage('Fullname', meta, element)}
                },
                password: {
                    required: `${messages.E001('Password')}`,
                    maxlength: function(meta, element) {return validMaxLengthMessage('Password', meta, element)}
                },
                rePassword: {
                    required: `${messages.E001('RePassword')}`,
                    maxlength: function(meta, element) {return validMaxLengthMessage('Re-password', meta, element)},
                    matchPassword: `${messages.E011}`
                },
                role: {
                    required: `${messages.E001('Role')}`,
                }
            }
        });
    }

    // Add method for checking re-password
    $.validator.addMethod("matchPassword", function(value) {
        const password = $("#password").val();
        if(value != password && value != '' && password != '') {
          return false;
        }
        return true;
      });
    

    $("#password").on("focusout", function(e) {
        $('#rePassword').valid();
    })
  
    $('#addButton').off('click').on('click', function(){
        if($('#addFrm').valid()) { 
            $('#addFrm').trigger('submit');
            $('#addButton').prop(enable, false);
        } else {
            if($('#username').valid()) {
                $('#username').focus();
            }
            if($('#fullName').valid()) {
                $('#fullName').focus();
            }
            if($('#password').valid()) {
                $('#password').focus();
            }
            if($('#rePassword').valid()) {
                $('#rePassword').focus();
            }
            if($('#role').valid()) {
                $('#role').focus();
            }
        }
    });
});
  