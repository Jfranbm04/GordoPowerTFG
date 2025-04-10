import React from 'react'
import { useNavigate } from 'react-router-dom';
import { User, Building2, Users, Wrench, ArrowRight, ArrowLeft, Settings } from 'lucide-react';
const DataFormPage = () => {

    const navigate = useNavigate();
    const [activeSection, setActiveSection] = React.useState('client');

    const sections = [
        { id: 'client', name: 'Datos del Cliente Final', icon: User },
        { id: 'promoter', name: 'Datos del Promotor', icon: Building2 },
        { id: 'installer', name: 'Datos del Instalador', icon: Wrench },
        { id: 'subcontractor', name: 'Datos de la Subcontrata', icon: Users },
        { id: 'technical', name: 'Datos Técnicos de la instalación', icon: Settings },
    ];

    const renderForm = () => {
        switch (activeSection) {
            case 'client':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre del cliente final</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de contratación</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de ejecución de obra</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de inicio de trabajos</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de finalización</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="tel" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                );
            case 'promoter':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de contratación</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de ejecución de obra</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de inicio de trabajos</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de finalización</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="tel" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                );
            case 'installer':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de contratación</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de ejecución de obra</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de inicio de trabajos</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de finalización</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="tel" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                );
            case 'subcontractor':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de contratación</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de ejecución de obra</label>
                            <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de inicio de trabajos</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de finalización</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="tel" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>
                    </div>
                );
            case 'technical':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de instalación</label>
                            <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                                <option value="">Seleccionar tipo</option>
                                <option value="conexion-red">Conectada a red (On-Grid)</option>
                                <option value="aislada">Aislada (Off-Grid)</option>
                                <option value="hibrida">Híbrida</option>
                                <option value="bombeo-solar">Bombeo solar</option>
                                <option value="parque-solar">Parque solar fotovoltaico</option>
                                <option value="autoconsumo-colectivo">Autoconsumo colectivo</option>
                            </select>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Materiales principales</label>
                            <div className="space-y-2">
                                <div>
                                    <input type="text" placeholder="Marca" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Modelo" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                </div>
                                <div>
                                    <input type="number" placeholder="Unidades" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Distribuidor</label>
                            <input type="text" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Números de serie</label>
                            <textarea className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" rows="3"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fotografías de la instalación</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                            <span>Subir archivos</span>
                                            <input type="file" className="sr-only" multiple accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Información técnica adicional</label>
                            <div className="space-y-2">
                                <textarea placeholder="Cuadros eléctricos" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" rows="2"></textarea>
                                <textarea placeholder="Estructuras" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" rows="2"></textarea>
                                <textarea placeholder="Canalizaciones" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" rows="2"></textarea>
                                <textarea placeholder="Protecciones" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar remains the same */}
            <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
                <div>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Nueva Instalación</h2>
                    </div>
                    <nav className="space-y-1 px-3">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === section.id
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {section.name}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => navigate('/installation/stages')}
                            className="w-full mt-4 flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            <ArrowRight className="mr-3 h-5 w-5" />
                            Pasar a Etapas
                        </button>
                    </nav>
                </div>
                <div className="p-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        <ArrowLeft className="mr-3 h-5 w-5" />
                        Volver
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {sections.find(s => s.id === activeSection)?.name}
                    </h3>
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default DataFormPage;