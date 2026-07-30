export default function Sidebar() {
return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col justify-between p-4 shadow-sm">
      {/* Sección Superior: Navegación Principal */}
        <div className="space-y-6">
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Menú
            </div>

            <nav className="space-y-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                    Panel Principal
                </a>

                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
                    Mis Tareas
                </a>
        
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
                    Proyectos
                </a>
            </nav>
        </div>

      {/* Sección Inferior: Configuración u Opciones adicionales */}
        <div className="border-t pt-4">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
                Configuración
            </a>
        </div>
    </aside>
);
}