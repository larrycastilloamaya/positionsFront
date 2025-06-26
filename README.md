# 🧭 Hikru Positions Frontend

Este proyecto es una aplicación frontend desarrollada en **React 18 + Vite + TypeScript** que consume una API REST para gestionar posiciones en Hikru.

---

## 🚀 Tecnologías Utilizadas

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (opcional)
- Git + Netlify para despliegue

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/hikru-positions-frontend.git
cd hikru-positions-frontend
npm install
```

---

## 🧪 Scripts de desarrollo

### Iniciar en modo desarrollo:

```bash
npm run dev
```

### Compilar para producción:

```bash
npm run build
```

---

## 🌐 API REST consumida

Esta aplicación consume el backend expuesto en:

```
https://positionshikru.azurewebsites.net/api/
```

### Endpoints utilizados:

- `GET /positions` — Obtener todas las posiciones
- `POST /positions` — Crear una posición
- `DELETE /positions/{id}` — Eliminar una posición
- `PUT /positions/{id}` — Edita una posición
- `GET /positions/{id}` — Obtiene una posición
- `GET /recruiters` — Obtener reclutadores
- `GET /departments` — Obtener departamentos

---

## 🧰 Funcionalidades principales

- 📄 Listado de posiciones
- 🔍 Filtros por texto, estado y presupuesto
- ➕ Modal para crear nuevas posiciones
- 🗑 Eliminar con confirmación SweetAlert
- 🗑 Editar una posición
- 🗑 Ver detalles de una posición
- 🖼 UI responsive con Tailwind

---

## 🌍 Despliegue en Netlify

Este proyecto está preparado para ser desplegado directamente en [Netlify](https://netlify.com/).

### Recomendaciones:

- `build command`:  
  ```
  npm run build
  ```

- `publish directory`:  
  ```
  dist
  ```


