import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function CrearCuenta() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'niño' | 'tutor' | 'admin'>('niño');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando registrar a:", correo);
    setCargando(true);

    try {
      // 1. Registro en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: correo,
        password: contrasena,
      });

      if (authError) throw authError;

      // 2. Guardar el perfil
      if (authData.user) {
        const { error: perfilError } = await supabase
          .from('perfiles')
          .insert([{
            id: authData.user.id,
            nombre_completo: nombre,
            tipo_usuario: tipoUsuario,
          }]);

        if (perfilError) throw perfilError;
        alert('¡Registro exitoso!');
      }
    } catch (error: any) {
      console.error("Error completo:", error);
      alert(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
      <h2 className="font-['Fredoka_One',cursive] text-[1.6rem] md:text-[2rem] text-[#3B0764] mb-6 text-center">
        Crear cuenta 🌟
      </h2>
      <form onSubmit={handleRegistro} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
          <input 
            type="text" 
            placeholder="Tu nombre" 
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6B21A8] focus:outline-none transition-colors"
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Correo</label>
          <input 
            type="email" 
            placeholder="tu@email.com" 
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6B21A8] focus:outline-none transition-colors"
            onChange={(e) => setCorreo(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            placeholder="********" 
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6B21A8] focus:outline-none transition-colors"
            onChange={(e) => setContrasena(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Soy...</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              type="button" 
              onClick={() => setTipoUsuario('niño')}
              className={`py-2 px-1 rounded-xl text-[0.8rem] md:text-[0.9rem] font-bold transition-all border-2 ${tipoUsuario === 'niño' ? 'bg-[#16A34A] text-white border-[#16A34A]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#16A34A]'}`}
            >
              👦 Niño
            </button>
            <button 
              type="button" 
              onClick={() => setTipoUsuario('tutor')}
              className={`py-2 px-1 rounded-xl text-[0.8rem] md:text-[0.9rem] font-bold transition-all border-2 ${tipoUsuario === 'tutor' ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#F97316]'}`}
            >
              👨‍👩‍👧 Tutor
            </button>
            <button 
              type="button" 
              onClick={() => setTipoUsuario('admin')}
              className={`py-2 px-1 rounded-xl text-[0.8rem] md:text-[0.9rem] font-bold transition-all border-2 ${tipoUsuario === 'admin' ? 'bg-[#6B21A8] text-white border-[#6B21A8]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#6B21A8]'}`}
            >
              👤 Admin
            </button>
          </div>
        </div>

        {/* ESTE ES EL BOTÓN QUE DISPARA EL SUBMIT */}
        <button 
          type="submit" 
          disabled={cargando}
          className="mt-4 w-full bg-[#6B21A8] hover:bg-[#7C3AED] disabled:bg-gray-400 text-white font-['Fredoka_One',cursive] text-[1.1rem] py-3.5 rounded-xl transition-all shadow-md"
        >
          {cargando ? 'Registrando...' : 'Crear cuenta 🚀'}
        </button>
      </form>
    </div>
  );
}