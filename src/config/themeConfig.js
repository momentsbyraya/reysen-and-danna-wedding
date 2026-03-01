// Theme Configuration - Softer Cerulean Blue palette (reduced saturation, increased lightness, sky undertone)
// Primary: #4A9FD4, Hover: #3B8FCE, Accent: #5BAED9 (WCAG AA text: #2E7BB8 where needed)
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-gray-900',
        secondary: 'bg-gray-800',
        accent: 'bg-[#5BAED9]',           // Softer Cerulean - main motif
        light: 'bg-white/50',
        theme: 'bg-[#B9E3FF]',             // Powder Blue - light backgrounds
        garden: 'bg-[#B9E3FF]',           // Powder Blue
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-[#4A9FD4]',         // Softer Cerulean - headings
        secondary: 'text-gray-300',
        accent: 'text-[#5BAED9]',         // Softer Cerulean - motif
        muted: 'text-gray-400',
        dark: 'text-wedding-800',
        theme: 'text-[#4A9FD4]',
        pause: 'text-[#dcdcdc]',
        custom: 'text-[#44484d]',
        light: '#6b7280',
        lightBlack: '#4a5568',
        cerulean: '#5BAED9',
        powderBlue: '#B9E3FF',
        royalAzure: '#4A9FD4',
        primaryDark: '#2E7BB8',            // Darker for WCAG AA on white (small text)
        // Aliases for components still using old names
        burntOrange: '#4A9FD4',
        sageGreen: '#5BAED9',
        gardenGreen: '#5BAED9',
        ivory: '#FFFFF0',
        beige: '#F5F5DC',
        brown: '#8B4513',
    },

    // Border Colors
    borders: {
        primary: 'border-gray-700',
        secondary: 'border-gray-600',
        accent: 'border-[#5BAED9]',
        theme: 'border-[#4A9FD4]',
        garden: 'border-[#5BAED9]',
    },

    // Button Colors - Softer Cerulean, hover slightly darker
    buttons: {
        primary: 'bg-[#4A9FD4] hover:bg-[#3B8FCE]',
        secondary: 'border border-gray-600 hover:border-gray-400',
        text: 'text-gray-300 hover:text-white',
        theme: 'bg-[#5BAED9] hover:bg-[#4A9FD4]',
        garden: 'bg-[#5BAED9] hover:bg-[#4A9FD4]',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-[#3B8FCE]',
        secondary: 'hover:border-gray-400 hover:text-white',
        theme: 'hover:bg-[#4A9FD4]',
        garden: 'hover:bg-[#4A9FD4]',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-05-05',
        highlightColor: 'bg-[#5BAED9]',       // Softer Cerulean
        heartColor: 'text-[#5BAED9]',
        textColor: 'text-gray-700',
        headerColor: 'text-[#4A9FD4]',        // Softer Cerulean
        dayNamesColor: 'text-[#5BAED9]',
        background: 'bg-[#B9E3FF]',           // Powder Blue
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-[#B9E3FF]',            // Powder Blue
        garden: 'bg-[#B9E3FF]',
    },

    // Custom CSS Variables
    cssVariables: {
        '--primary-bg': '#111827',
        '--secondary-bg': '#1f2937',
        '--accent-bg': '#4A9FD4',             // Softer Cerulean - buttons, strong accents
        '--accent-hover': '#3B8FCE',
        '--primary-text': '#4A9FD4',          // Softer Cerulean - headings
        '--secondary-text': '#d1d5db',
        '--accent-text': '#5BAED9',           // Softer Cerulean - motif
        '--muted-text': '#9ca3af',
        '--border-color': '#5BAED9',
        '--custom-theme': '#5BAED9',
        '--cerulean': '#5BAED9',
        '--powder-blue': '#B9E3FF',
        '--royal-azure': '#4A9FD4',
        '--ivory': '#FFFFF0',
        '--beige': '#F5F5DC',
        '--brown': '#8B4513',
        '--garden-bg': '#B9E3FF',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-[#5BAED9]',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-[#5BAED9]',
        }
    },

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

    gardenWedding: {
        backgrounds: {
            primary: 'bg-[#B9E3FF]',
            secondary: 'bg-white',
            accent: 'bg-[#4A9FD4]',
            theme: 'bg-[#B9E3FF]',
        },
        text: {
            primary: 'text-[#4A9FD4]',
            secondary: 'text-gray-700',
            accent: 'text-[#5BAED9]',
            garden: 'text-[#5BAED9]',
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
