// ---------------------------------------------
// Conexão com o Supabase (somente login/cadastro)
// ---------------------------------------------
const supabaseClient = window.supabase.createClient(
    "https://sbieoyojhivetcqyobnh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiaWVveW9qaGl2ZXRjcXlvYm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTI0MDQsImV4cCI6MjA3OTA4ODQwNH0.b3MXGsxNZ5IL59bfmizlqZ8Q1qhXXoQAfZ0rVEjv6QU"
);

// ---------------------------------------------
// Hash da senha
// ---------------------------------------------
async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = [...new Uint8Array(hashBuffer)];
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------
// CADASTRO
// ---------------------------------------------
const formCadastro = document.querySelector(".cadastro-form");

if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.querySelector("#nome").value;
        const email = document.querySelector("#email_cadastro").value;
        const senha = document.querySelector("#senha_cadastro").value;
        const confirmar = document.querySelector("#confirmar_senha").value;

        if (senha !== confirmar) {
            alert("As senhas não coincidem!");
            return;
        }

        const hashed = await hashPassword(senha);

        const { data, error } = await supabaseClient
            .from("usuarios")
            .insert([{ nome, email, senha: hashed }]);

        if (error) return alert("Erro ao cadastrar: " + error.message);

        alert("Cadastro realizado!");
        window.location.href = "login.html";
    });
}

// ---------------------------------------------
// LOGIN
// ---------------------------------------------
const formLogin = document.querySelector(".login-form");

if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
        const hashed = await hashPassword(senha);

        const { data, error } = await supabaseClient
            .from("usuarios")
            .select("*")
            .eq("email", email)
            .eq("senha", hashed)
            .single();

        if (error || !data) {
            return alert("E-mail ou senha incorretos!");
        }

        localStorage.setItem("usuario", JSON.stringify(data));
        alert("Login realizado!");
        window.location.href = "home.html";
    });
}

// ---------------------------------------------
// Exibir nome
// ---------------------------------------------
const usuario = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario"))
    : null;

if (usuario && document.querySelector("#bemvindo")) {
    document.querySelector("#bemvindo").innerText = "Olá, " + usuario.nome.split(" ")[0] + "!";
}
