// Theme Configuration - Easy to customize colors
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-gray-900',        // Main dark background
        secondary: 'bg-gray-800',      // Secondary dark background (modals, cards)
        accent: 'bg-[#CC5500]',        // Accent background (Burnt Orange)
        light: 'bg-white/50',          // Light overlay backgrounds
        theme: 'bg-[#F5F5DC]',         // Custom theme color (Beige/Ivory)
        garden: 'bg-[#F0F8F0]',       // Garden wedding light background
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat', // Crumpled paper background
    },

    // Text Colors - Garden Wedding Theme
    text: {
        primary: 'text-[#CC5500]',     // Main heading text color (Burnt Orange)
        secondary: 'text-gray-300',    // Subheading and body text color
        accent: 'text-[#CC5500]',      // Accent text color (Burnt Orange)
        muted: 'text-gray-400',        // Muted text color (icons, small text)
        dark: 'text-wedding-800',      // Dark text for light backgrounds
        theme: 'text-[#E07A5F]',       // Custom theme text color (Terracotta)
        pause: 'text-[#dcdcdc]',       // Pause button text color
        custom: 'text-[#44484d]',      // Custom text color
        light: '#6b7280',              // Light shade text color (gray-500)
        lightBlack: '#4a5568',         // Lighter black shade (gray-600)
        // Garden Wedding Color Palette
        terracotta: '#E07A5F',         // Terracotta color
        burntOrange: '#CC5500',        // Burnt Orange color (main)
        lightBurntOrange: '#E67E5F',   // Light Burnt Orange color
        sageGreen: '#87AE73',          // Sage Green color
        darkSageGreen: '#6B8F5A',       // Dark Sage Green color
        ivory: '#FFFFF0',              // Ivory color
        beige: '#F5F5DC',              // Beige color
        brown: '#8B4513',              // Brown color
        gardenGreen: '#9CAF88',        // Garden green variant
    },

    // Border Colors - Garden Wedding Theme
    borders: {
        primary: 'border-gray-700',    // Main border color
        secondary: 'border-gray-600',  // Secondary border color
        accent: 'border-[#CC5500]',    // Accent border color (Burnt Orange)
        theme: 'border-[#E07A5F]',     // Custom theme border color (Terracotta)
        garden: 'border-[#87AE73]',    // Garden green border
    },

    // Button Colors - Garden Wedding Theme
    buttons: {
        primary: 'bg-[#CC5500] hover:bg-[#B84A00]',  // Primary button (Burnt Orange)
        secondary: 'border border-gray-600 hover:border-gray-400', // Secondary button
        text: 'text-gray-300 hover:text-white', // Button text color
        theme: 'bg-[#E07A5F] hover:bg-[#E07A5F]/80', // Custom theme button (Terracotta)
        garden: 'bg-[#87AE73] hover:bg-[#7A9D66]',   // Garden green button
    },

    // Hover Effects - Garden Wedding Theme
    hover: {
        primary: 'hover:bg-[#B84A00]',     // Primary button hover (Dark Burnt Orange)
        secondary: 'hover:border-gray-400 hover:text-white', // Secondary button hover
        theme: 'hover:bg-[#E07A5F]/80',     // Custom theme hover (Terracotta)
        garden: 'hover:bg-[#7A9D66]',      // Garden green hover
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration - Garden Wedding Theme
    calendar: {
        weddingDate: '2026-04-07',          // Wedding date (YYYY-MM-DD format)
        highlightColor: 'bg-[#87AE73]',      // Color for wedding date highlight (Sage Green)
        heartColor: 'text-[#CC5500]',        // Color for heart icon (Burnt Orange)
        textColor: 'text-gray-700',         // Calendar text color
        headerColor: 'text-[#CC5500]',       // Month header color (Burnt Orange)
        dayNamesColor: 'text-[#87AE73]',     // Day names color (Sage Green)
        background: 'bg-[#F0F8F0]',          // Calendar background color (Garden)
    },

    // Paragraph Configuration - Garden Wedding Theme
    paragraph: {
        background: 'bg-[#F5F5DC]',         // Paragraph background color (Beige/Ivory)
        garden: 'bg-[#F0F8F0]',            // Garden wedding background
    },

    // Custom CSS Variables - Garden Wedding Theme (for advanced customization)
    cssVariables: {
        '--primary-bg': '#111827',           // #111827 (gray-900)
        '--secondary-bg': '#1f2937',        // #1f2937 (gray-800)
        '--accent-bg': '#CC5500',           // #CC5500 (Burnt Orange) - Main color
        '--accent-hover': '#B84A00',        // #B84A00 (Dark Burnt Orange Hover)
        '--primary-text': '#CC5500',        // #CC5500 (Burnt Orange)
        '--secondary-text': '#d1d5db',      // #d1d5db (gray-300)
        '--accent-text': '#CC5500',         // #CC5500 (Burnt Orange)
        '--muted-text': '#9ca3af',          // #9ca3af (gray-400)
        '--border-color': '#E07A5F',        // #E07A5F (Terracotta)
        '--custom-theme': '#E07A5F',        // #E07A5F (Terracotta)
        // Garden Wedding Color Palette
        '--terracotta': '#E07A5F',          // Terracotta
        '--burnt-orange': '#CC5500',        // Burnt Orange (Main)
        '--sage-green': '#87AE73',          // Sage Green
        '--garden-green': '#9CAF88',        // Garden Green variant
        '--ivory': '#FFFFF0',               // Ivory
        '--beige': '#F5F5DC',               // Beige
        '--brown': '#8B4513',               // Brown
        '--garden-bg': '#F0F8F0',           // Garden wedding background
    }
}

// Quick color presets for different themes
export const themePresets = {
    // Dark Elegant (Current)
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-[#008080]',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-[#008080]',
        }
    },

    // Light Romantic
    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },

    // Warm Autumn
    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    },

    // Garden Wedding Theme
    gardenWedding: {
        backgrounds: {
            primary: 'bg-[#F0F8F0]',        // Garden light background
            secondary: 'bg-white',
            accent: 'bg-[#CC5500]',         // Burnt Orange
            theme: 'bg-[#F5F5DC]',          // Beige/Ivory
        },
        text: {
            primary: 'text-[#CC5500]',       // Burnt Orange
            secondary: 'text-gray-700',
            accent: 'text-[#E07A5F]',       // Terracotta
            garden: 'text-[#87AE73]',       // Sage Green
        }
    }
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
} 