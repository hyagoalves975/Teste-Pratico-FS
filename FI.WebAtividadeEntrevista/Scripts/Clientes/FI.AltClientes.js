window.beneficiariosList = [];
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CPF').val(CPFMask(obj.CPF));
        $('#formCadastro #CEP').val(CepMask(obj.CEP));
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(PhoneMask(obj.Telefone));
       
        if (obj.Beneficiarios && obj.Beneficiarios.length > 0) {
            obj.Beneficiarios.forEach(function (beneficiario) {
                addBeneficiarioModal(CPFMask(beneficiario.CPF), beneficiario.Nome);
            });
        }

    }

    $('#formCadastro').off('submit').on('submit', function (e) {
        e.preventDefault(); 
        if (!cpfValidate($('#CPF').val())) {
            e.preventDefault();
            alert(" O CPF digitado é inválido.");
            $('#CPF').focus();
            return false;
        }

        var cpf = clearString($("#CPF").val());
        var cep = clearString($("#CEP").val());
        var telefone = clearString($("#Telefone").val());
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": cpf,
                "CEP": cep,
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": telefone,
                "Beneficiarios": beneficiariosList
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })

    $('#CPF').on('input', function () {
        const cpfInput = $(this).val();
        $(this).val(CPFMask(cpfInput));
        clearErrorStyle('#CPF', '#errorMessage')

        if (cpfInput.length > 13) {
            if (!cpfValidate(cpfInput)) {
                setErrorStyle('#CPF', '#errorMessage')
            } else {
                clearErrorStyle('#CPF', '#errorMessage')
            }
        }
    });

    $('#CPFBeneficiario').on('input', function () {
        const cpfBeneficiario = $(this).val();
        $(this).val(CPFMask(cpfBeneficiario));
        clearErrorStyle('#CPFBeneficiario', '#errorMessageBeneficiarios')

        if (cpfBeneficiario.length > 13) {
            if (!cpfValidate(cpfBeneficiario)) {
                setErrorStyle('#CPFBeneficiario', '#errorMessageBeneficiarios')
            } else {
                clearErrorStyle('#CPFBeneficiario', '#errorMessageBeneficiarios')
            }
        }
    });

    $('#btnClose').off('click').on('click', function () {
        clearErrorStyle('#CPFBeneficiario', '#errorMessageBeneficiarios');
        $('#CPFBeneficiario').val('');
        $('#NomeBeneficiario').val('');
    });

    $('#btnIncluirModal').off('click').on('click', function () {
        let cpfBeneficiario = $('#CPFBeneficiario').val();
        let nomeBeneficiario = $('#NomeBeneficiario').val();

        if (cpfBeneficiario && nomeBeneficiario) {
            addBeneficiarioModal(cpfBeneficiario, nomeBeneficiario);
        } else {
            alert("Digite o nome e o CPF do Beneficiário")
        }
    });

    $(document).off('click', '.btnExcluir').on('click', '.btnExcluir', function () {
        const cpfBeneficiario = $(this).closest('tr').find('.col-cpfBeneficiario').text();
        deleteBeneficiarioModal(cpfBeneficiario);
        $(this).closest('tr').remove();
    });

    $(document).off('click', '.btnAlterar').on('click', '.btnAlterar', function () {
        clearErrorStyle('#CPFBeneficiario', '#errorMessageBeneficiarios')
        let row = $(this).closest('tr');
        let colCPFBeneficiario = row.find('.col-cpfBeneficiario').text();
        let colNomeBeneficiario = row.find('.col-nomeBeneficiario').text();
        alterBeneficiarioModal(row, colCPFBeneficiario, colNomeBeneficiario);
    });

    $('#Telefone').on('input', function () {
        const phone = $(this).val();
        $(this).val(PhoneMask(phone));
    });

    $('#CEP').on('input', function () {
        const cep = $(this).val();
        $(this).val(CepMask(cep));
    });
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
