window.beneficiariosList = [];

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

function setErrorStyle(input, span) {
    $(input).css('border-color', 'red')

    $(span).show();
}

function clearErrorStyle(input, span) {
    $(input).css('border-color', '')

    $(span).hide();
}

function addBeneficiarioModal(cpfBeneficiario, nomeBeneficiario) {
    const cpfCliente = $("#CPF").val();

    if (cpfBeneficiario === cpfCliente) {
        alert('Beneficiário inválido');
        return false;
    } else if (!cpfValidate(cpfBeneficiario)) {
        alert('O CPF digitado é inválido');
        return false;
    } else if (validateCPFBeneficiarioModal(cpfBeneficiario)) {
        alert('Beneficiário já cadastrado');
        return false;
    }

    var cpf = clearString(cpfBeneficiario);

    beneficiariosList.push({ CPF: cpf, Nome: nomeBeneficiario });

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

    deleteBeneficiarioModal(colCPFBeneficiario);

    row.remove();
}

function deleteBeneficiarioModal(cpfBeneficiario) {
    var cpfClean = clearString(cpfBeneficiario);
    window.beneficiariosList = window.beneficiariosList.filter(b => b.CPF !== cpfClean);
};

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

function clearString(input) {
    return input.replace(/[\.\-\(\) ]/g, '');
}