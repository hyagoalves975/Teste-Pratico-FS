$(document).ready(function () {
    $('#formCadastro').off('submit').submit(function (e) {
        e.preventDefault();
        if (!cpfValidate($('#CPF').val())) {
            e.preventDefault();
            alert(" O CPF digitado é inválido.");
            $('#CPF').focus();
            return false;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find("#CPF").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
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

    $('#btnIncluirModal').off('click').on('click', function () {
        let cpfBeneficiario = $('#CPFBeneficiario').val();
        let nomeBeneficiario = $('#NomeBeneficiario').val();

        if (cpfBeneficiario && nomeBeneficiario) {
            addBeneficiarioModal(cpfBeneficiario, nomeBeneficiario);
        } else {
            alert("Digite o nome e o CPF do Beneficiário")
        }
    });

    $('#beneficiariosTableBody').off('click').on('click', '.btnExcluir', function () {
        $(this).closest('tr').remove();
    });

    $('#beneficiariosTableBody').off('click').on('click', '.btnAlterar', function () {
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

function CPFMask(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length <= 3) {
        return cpf;
    } else if (cpf.length <= 6) {
        return cpf.slice(0, 3) + '.' + cpf.slice(3);
    } else if (cpf.length <= 9) {
        return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6);
    } else {
        return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9, 11);
    }
}

function PhoneMask(phone) {
    phone = phone.replace(/\D/g, '');

    if (phone.length <= 2) {
        return phone;
    } else if (phone.length <= 6) {
        return '(' + phone.slice(0, 2) + ') ' + phone.slice(2);
    } else {
        return '(' + phone.slice(0, 2) + ') ' + phone.slice(2, 6) + '-' + phone.slice(6, 10);
    }
}

function CepMask(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep.length > 5) {
        cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
    }

    return cep;
}

function cpfValidate(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sumDigits = 0;
    for (let i = 0; i < 9; i++) {
        sumDigits += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstDigit = (sumDigits * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) {
        firstDigit = 0;
    }

    if (firstDigit !== parseInt(cpf.charAt(9))) {
        return false;
    }

    sumDigits = 0;
    for (let i = 0; i < 10; i++) {
        sumDigits += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = (sumDigits * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) {
        secondDigit = 0;
    }
    if (secondDigit !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

function setErrorStyle(input, span){
    $(input).css('border-color', 'red')

    $(span).show();
}

function clearErrorStyle(input, span) {
    $(input).css('border-color', '')

    $(span).hide();
}

function addBeneficiarioModal(cpfBeneficiario, nomeBeneficiario) {
    if (!cpfValidate(cpfBeneficiario)) {
        alert('O CPF digitado é inválido');
        return false;
    }

    if (validateCPFBeneficiarioModal(cpfBeneficiario)) {
        alert('Beneficiário já cadastrado');
        return false;
    }

    var newRowTable =
        `<tr>
            <td class="col-cpfBeneficiario">${cpfBeneficiario}</td>
            <td class="col-nomeBeneficiario">${nomeBeneficiario}</td>
            <td>
                <button type="button" class="btn btn-sm btn-primary btnAlterar">Alterar</button>
                <button type="button" class="btn btn-sm btn-primary btnExcluir">Excluir</button>
            </td>
        </tr>`;

    $('#beneficiariosTableBody').append(newRowTable);

    $('#CPFBeneficiario').val('');
    $('#NomeBeneficiario').val('');
}

function alterBeneficiarioModal(row, colCPFBeneficiario, colNomeBeneficiario) {
    $('#CPFBeneficiario').val(colCPFBeneficiario);
    $('#NomeBeneficiario').val(colNomeBeneficiario);

    row.remove();
}

function validateCPFBeneficiarioModal(cpfBeneficiario) {
    let condition = false;
    $('#beneficiariosTableBody tr').each(function () {
        const cpfAdicionado = $(this).find('.col-cpfBeneficiario').text();

        if (cpfAdicionado === cpfBeneficiario) {
            condition = true;
            return false;
        }
    });
    return condition;
}