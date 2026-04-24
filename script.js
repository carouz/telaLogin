// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    // --- ELEMENTOS DAS PÁGINAS ---
    const loginForm = document.getElementById("loginForm");
    const cadastroForm = document.getElementById("cadastroForm");
    const btnLogout = document.getElementById("btnLogout");
    const nomeDisplay = document.getElementById("nomeUsuario");

    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const userIn = document.getElementById("usuario").value;
            const passIn = document.getElementById("senha").value;
            const msg = document.getElementById("msgLogin");

            // Recupera o usuário do banco de dados (localStorage)
            const salvo = JSON.parse(localStorage.getItem('usuarioBD'));

            console.log("Tentativa de login:", userIn);
            console.log("Dados salvos no sistema:", salvo);

            // Verifica se é o admin ou o usuário cadastrado
            const loginSucesso = (salvo && userIn === salvo.nome && passIn === salvo.senha) || 
                                 (userIn === "adm" && passIn === "123");

            if (loginSucesso) {
                const nomeExibicao = (userIn === "adm") ? "Administrador" : salvo.nome;
                
                // Grava a sessão do usuário
                localStorage.setItem('usuarioLogado', nomeExibicao);
                
                console.log("Login OK! Redirecionando para dashboard.html");
                
                // Redireciona explicitamente para a dashboard
                window.location.href = "dashboard.html";
            } else {
                msg.textContent = "Usuário ou senha incorretos.";
            }
        });
    }

    // --- LÓGICA DE CADASTRO ---
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("novoUsuario").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("novaSenha").value;
            const confirma = document.getElementById("confirmarSenha").value;
            const msg = document.getElementById("msgCadastro");

            if (senha !== confirma) {
                msg.className = "error";
                msg.textContent = "As senhas não coincidem!";
                return;
            }

            // Salva o novo usuário
            const usuarioDados = { nome, email, senha };
            localStorage.setItem('usuarioBD', JSON.stringify(usuarioDados));

            console.log("Usuário cadastrado com sucesso:", nome);

            msg.className = "success";
            msg.textContent = "Cadastro realizado! Redirecionando para o login...";
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        });
    }

    // --- LÓGICA DA DASHBOARD ---
    if (nomeDisplay) {
        const logado = localStorage.getItem('usuarioLogado');
        
        if (!logado) {
            console.log("Acesso negado: Nenhum usuário logado. Voltando para o index.");
            window.location.href = "index.html";
        } else {
            console.log("Dashboard carregada para:", logado);
            nomeDisplay.textContent = logado;
        }
    }

    // --- LOGOUT ---
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem('usuarioLogado');
            console.log("Sessão encerrada.");
            window.location.href = "index.html";
        });
    }
});