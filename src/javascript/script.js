const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const semanaContainer = document.getElementById("semana");
const roadmapContainer = document.getElementById("roadmapContainer");
const progressoTexto = document.getElementById("progressoTexto");
const barraProgresso = document.getElementById("barraProgresso");

const tarefasCronograma = diasDaSemana.map((dia, i) => ({
  dia,
  tarefas: [
    { id: `t${i}-teorica`, texto: `Estudo teórico de ${dia}`, tipo: 'teorica' },
    { id: `t${i}-pratica`, texto: `Prática de exercícios de ${dia}`, tipo: 'pratica' }
  ]
}));

const roadmapSemanas = [
  {
    titulo: "Semana 1",
    foco: "HTML e Lógica de Programação",
    tarefas: ["Introdução ao HTML", "Tags semânticas", "Estrutura básica", "Algoritmos simples"]
  },
  {
    titulo: "Semana 2",
    foco: "CSS e Estilização",
    tarefas: ["Seletores", "Box Model", "Flexbox", "Media Queries"]
  },
  {
    titulo: "Semana 3",
    foco: "JavaScript Básico",
    tarefas: ["Variáveis", "Funções", "Eventos", "DOM"]
  }
];

function criarCheckbox(id, texto) {
  const label = document.createElement("label");
  label.className = "tarefa";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = localStorage.getItem(id) === "true";
  checkbox.addEventListener("change", () => {
    localStorage.setItem(id, checkbox.checked);
    atualizarProgresso();
  });

  const span = document.createElement("span");
  span.textContent = texto;

  label.appendChild(checkbox);
  label.appendChild(span);

  return label;
}

function montarCronograma() {
  tarefasCronograma.forEach((dia, index) => {
    const div = document.createElement("div");
    div.className = "dia";

    const h3 = document.createElement("h3");
    h3.textContent = dia.dia;
    div.appendChild(h3);

    dia.tarefas.forEach(tarefa => {
      const checkbox = criarCheckbox(tarefa.id, tarefa.texto);
      div.appendChild(checkbox);
    });

    semanaContainer.appendChild(div);
  });
}

function montarRoadmap() {
  roadmapSemanas.forEach((semana, index) => {
    const card = document.createElement("div");
    card.className = "card-semana";

    const h4 = document.createElement("h4");
    h4.textContent = semana.titulo;
    const foco = document.createElement("p");
    foco.textContent = `Foco: ${semana.foco}`;

    card.appendChild(h4);
    card.appendChild(foco);

    semana.tarefas.forEach((tarefa, idx) => {
      const id = `s${index}-t${idx}`;
      const checkbox = criarCheckbox(id, tarefa);
      card.appendChild(checkbox);
    });

    roadmapContainer.appendChild(card);
  });
}

function atualizarProgresso() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const total = checkboxes.length;
  const marcados = Array.from(checkboxes).filter(c => c.checked).length;
  const porcentagem = Math.round((marcados / total) * 100);

  progressoTexto.textContent = `Progresso geral: ${porcentagem}%`;
  barraProgresso.style.width = `${porcentagem}%`;
}

// Inicializar tudo
montarCronograma();
montarRoadmap();
atualizarProgresso();
