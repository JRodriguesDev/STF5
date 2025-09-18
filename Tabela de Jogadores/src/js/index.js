const tbody = document.querySelector('#tbody');
const select = [...document.querySelectorAll('.select')];

const getPlayerAPI = async () => {
    const url = 'https://stf5-campeonato-api.onrender.com/allPlayers';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const putPlayerAPI = async (id, value) => {
    try {
    const url = `https://stf5-campeonato-api.onrender.com/editPlayers/${id}`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    });
    tbody.innerHTML = '';
    renderPlayer();
    }
    catch(erro) {
        console.log("Erro ao Atualizar jogador devido erro: " + erro);
    };
}

const renderBtn = async () => {
    const btn = [...document.querySelectorAll('.btn')];
    btn.map((el) => {
        el.addEventListener('click', (e) => {
            const tableID = e.target.parentElement.parentElement.children[0].innerHTML;
            const selectValue = {"status": e.target.parentElement.children[0].value};
            putPlayerAPI(tableID, selectValue);
        })
    })
}

const renderPlayer = async () => {
    const players = await getPlayerAPI();
    players.map((el) => {
        if (el['status'] == 'Não Pago') {
            const tr = document.createElement('tr');
            tr.innerHTML =
                `
                        <td class="tableId">${el['_id']}</td>
                        <td>${el['userName']}</td>
                        <td>${el['name']}</td>
                        <td>${el['turma']}</td>
                        <td>
                            <select class="select" name="status" id="">
                                <option value="Pago">Pago</option>
                                <option selected value="Não Pago">Nao Pago</option>
                                <option value="Eliminado">Eliminado</option>
                            </select>
                            <button class="btn">Atualizar</button>
                        </td>
                `
                tbody.appendChild(tr);
        } else if (el['status'] == 'Pago') {
            const tr = document.createElement('tr');
            tr.innerHTML =
            `
            <td class="tableId">${el['_id']}</td>
            <td>${el['userName']}</td>
            <td>${el['name']}</td>
            <td>${el['turma']}</td>
            <td>
                <select class="select" name="status" id="">
                    <option selected value="Pago">Pago</option>
                    <option value="Nao Pago">Não Pago</option>
                    <option value="Eliminado">Eliminado</option>
                </select>
                <button class="btn">Atualizar</button>
            </td>
            `
            tbody.appendChild(tr);
        } else if (el['status'] == 'Eliminado') {
            const tr = document.createElement('tr');
            tr.innerHTML =
            `
            <td class="tableId">${el['_id']}</td>
            <td>${el['userName']}</td>
            <td>${el['name']}</td>
            <td>${el['turma']}</td>
            <td>
                <select class="select" name="status" id="">
                    <option value="Pago">Pago</option>
                    <option value="Nao Pago">Não Pago</option>
                    <option selected value="Eliminado">Eliminado</option>
                </select>
                <button class="btn">Atualizar</button>
            </td>
            `
            tbody.appendChild(tr);
        }
    })
    renderBtn();
}

renderPlayer()
