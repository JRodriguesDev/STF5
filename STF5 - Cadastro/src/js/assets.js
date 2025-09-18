// Seletores dos campos
const inputName = document.querySelector('#inputName');
const inputUser = document.querySelector('#inputUser');
const inputT = document.querySelector('#inputT');
const btn = document.querySelector('#btn');
const cont = document.querySelector('#cont');
const form = document.querySelector('#form');
const pixUrl = '00020126330014br.gov.bcb.pix01111906882169552040000530398654045.005802BR5925LUCAS RAFAEL RIBEIRO DE A6009Sao Paulo62070503***6304AD33';

// Função para chamar a API que salva os jogadores
const STF5Api = async (p) => {
    try {
        const response = await fetch('https://stf5-campeonato-api.onrender.com/savePlayers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(p)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar jogador');
        }

        const data = await response.json();
        console.log('Jogador salvo:', data);

    } catch (error) {
        console.error('Erro:', error);
    }
}

const savePlayer = (name, userName, turma) => {
    const player = {
        "name": inputName.value,
        "userName": inputUser.value,
        "turma": inputT.value,
        "status": "Não Pago"
    }

    STF5Api(player);

};

const pix = () => {
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'imgDiv');
    imgDiv.innerHTML =
    `
    <img src="src/img/lucas.jpeg" alt="">
    <button id="btnPix">Aperte aqui para copiar o link do pix</button>
    <span>Para validar a inscriçao pague com o QR code<span>
    `
    document.body.appendChild(imgDiv);
    const btnPix = document.querySelector('#btnPix');
    btnPix.addEventListener('click', (e) => {
        navigator.clipboard.writeText(pixUrl);
    })
}

// Função para limpar os campos
const limpa = () => {
    inputName.value = '';
    inputUser.value = '';
    inputT.value = '';
}

// Ao clicar no botão
btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Verificar se os campos estão preenchidos corretamente
    if (inputName.value !== '' && inputUser.value !== '' && inputT.value !== '') {
        cont.remove()
        pix();
        savePlayer(inputName.value, inputUser.value, inputT.value);

    } else {
        limpa();  // Limpa os campos
        cont.classList.toggle('erro');
        setTimeout(() => {
            cont.classList.toggle('erro');
        }, 300);
    }
});
