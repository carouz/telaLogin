const form = document.getElementById("loginForm");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");
form.addEventListener("submit", (e) => {
 e.preventDefault(); // evita o recarregamento da página

 if (usuario.value === "" || senha.value === "") {
 mensagem.textContent = "Preencha todos os campos!";
 } else if (usuario.value === "adm" && senha.value === "123") {
 mensagem.style.color = "#03dac6";
 mensagem.textContent = "Login realizado com sucesso!";
 } else {
 mensagem.textContent = "Usuário ou senha incorretos.";
 }
});