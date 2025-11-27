#!/bin/bash

# Script para fazer deploy do portfólio
# Verifica e configura o remote corretamente

cd "$(dirname "$0")"

# Inicializa o repositório se não existir
if [ ! -d .git ]; then
    git init
fi

# Adiciona todos os arquivos
git add .

# Verifica se há mudanças para commitar
if [ -n "$(git status --porcelain)" ]; then
    git commit -m "Commit upgrade"
else
    echo "Nenhuma mudança para commitar"
fi

# Remove o remote se já existir e adiciona novamente
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Robson777555/portifolio.git

# Faz o push
git push origin main --force

echo "Deploy concluído!"

