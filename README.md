# FIPE Search Frontend

![Angular](https://img.shields.io/badge/Angular-14-red)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

> Projeto frontend Angular 14 para consulta de preços de veículos usando a tabela FIPE.

---

## 🔥 Link do Deploy

A aplicação frontend está disponível publicamente em:

[https://fipe-search-frontend.vercel.app/](https://fipe-search-frontend.vercel.app/)

---

## 🚀 Tecnologias utilizadas

- **Frontend**: Angular 14, TypeScript
- **UI Components**: PrimeNG
- **Forms**: Reactive Forms
- **HTTP Requests**: HttpClientModule
- **Deploy**: Vercel

---

## 📦 Funcionalidades

- Seleção de tipo de veículo (`car`, `motorcycle`, `truck`)
- Dropdowns dinâmicos de marcas e modelos com loading spinner
- Consulta de histórico de preços de veículos
- Layout responsivo e clean usando PrimeNG
- Validação de formulários usando Reactive Forms

---

## 🛠 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone git@github.com:vtrajanodev/fipe-search-frontend.git
cd fipe-search-frontend
```

```bash
npm install
```

```bash
ng serve
```

Acesse em http://localhost:4200 

💡 Observações

Certifique-se de que a API backend esteja rodando para que os dropdowns e consultas funcionem corretamente.

O deploy atual usa Vercel: https://fipe-search-frontend.vercel.app/