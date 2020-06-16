$('.cpf').hide()
$('.name').hide()
// funcao que invalida o form caso o cpf seja invalido
function validaForm(frm) {
    if (validarCPF(frm.cpf.value)) {
        $('.cpf').hide()
        return true
    } else {
        $('.cpf').show()
        return false
    }
}
//parte da validação do cpf 
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf == '') return false
        // Essa parte elimina os  CPFs invalidos conhecidos
    if (
        cpf.length != 11 ||
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999'
    )
        return false
        
    add = 0
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(9))) return false
        // Valida 2o digito
    add = 0
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0
    if (rev != parseInt(cpf.charAt(10))) return false
    return true
}

let api
    //setagem dos respectivos valores nos inputs referentes a o endereç0, cidade , bairro e complemento de maneira automatica.
$('#cep').focusout(() => {
        const cep = $('#cep').val()
        const cepString = cep
        const parsedCep = cepString
            .normalize('NFD')
            .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
            //requisição Ajax
        $.ajax({
            url: 'https://viacep.com.br/ws/' + parsedCep + '/json/unicode/',
            success: (data) => {
                api = data
                $('#endereco').attr('value', api.logradouro)
                $('#cidade').attr('value', api.localidade)
                $('#bairro').attr('value', api.bairro)
                $('#complemento').attr('value', api.complemento)
            },
        })
    })
    // colocação das mascaras nos inputs
$('#phone').mask('(00) 0 0000-0000')
$('#whatsApp').mask('(00) 0 0000-0000')

$('#cpf').mask('999.999.999-99')
$('#cep').mask('99.999-999')