import React from 'react'

const Loading = ({ size = 'md' }) => {
    // Definir tamaños basados en el prop size
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-16 w-16 md:h-20 md:w-20',
        lg: 'h-24 w-24 md:h-32 md:w-32',
    }
    
    const sizeClass = sizes[size] || sizes.md;
    
    return (
        <div className="flex items-center justify-center">
            <div 
                className={`p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 ${sizeClass} aspect-square rounded-full`} 
            > 
                <div 
                    className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md" 
                ></div> 
            </div>
        </div>
    )
}

export default Loading