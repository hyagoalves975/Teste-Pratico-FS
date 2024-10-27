
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
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
        const cpf = $(this).val();
        $(this).val(CPFMask(cpf));
    });

    $('#CPFBeneficiarios').on('input', function () {
        const cpfBeneficiario = $(this).val();
        $(this).val(CPFMask(cpfBeneficiario));
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
