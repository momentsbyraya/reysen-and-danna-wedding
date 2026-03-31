// Theme Configuration - Dusty Blue palette (muted, elegant, sky undertone)
// Primary: #6685A4, Hover: #2F4869, Accent: #7092BE
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-gray-900',
        secondary: 'bg-gray-800',
        accent: 'bg-[#7092BE]',           // Medium Denim - main motif
        light: 'bg-white/50',
        theme: 'bg-[#94AFC3]',             // Muted Steel Blue - light backgrounds
        garden: 'bg-[#94AFC3]',           // Muted Steel Blue
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-[#6685A4]',         // Dusty Slate Blue - headings
        secondary: 'text-gray-300',
        accent: 'text-[#7092BE]',         // Medium Denim - motif
        muted: 'text-gray-400',
        dark: 'text-wedding-800',
        theme: 'text-[#6685A4]',
        pause: 'text-[#dcdcdc]',
        custom: 'text-[#44484d]',
        light: '#6b7280',
        lightBlack: '#4a5568',
        cerulean: '#7092BE',
        powderBlue: '#94AFC3',
        royalAzure: '#6685A4',
        primaryDark: '#2F4869',            // Deep Navy - darker for contrast
        // Aliases for components still using old names
        burntOrange: '#6685A4',
        sageGreen: '#7092BE',
        gardenGreen: '#7092BE',
        ivory: '#FFFFF0',
        beige: '#F5F5DC',
        brown: '#8B4513',
    },

    // Border Colors
    borders: {
        primary: 'border-gray-700',
        secondary: 'border-gray-600',
        accent: 'border-[#7092BE]',
        theme: 'border-[#6685A4]',
        garden: 'border-[#7092BE]',
    },

    // Button Colors - Softer Cerulean, hover slightly darker
    buttons: {
        primary: 'bg-[#6685A4] hover:bg-[#2F4869]',
        secondary: 'border border-gray-600 hover:border-gray-400',
        text: 'text-gray-300 hover:text-white',
        theme: 'bg-[#7092BE] hover:bg-[#6685A4]',
        garden: 'bg-[#7092BE] hover:bg-[#6685A4]',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-[#2F4869]',
        secondary: 'hover:border-gray-400 hover:text-white',
        theme: 'hover:bg-[#6685A4]',
        garden: 'hover:bg-[#6685A4]',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-04-18',
        highlightColor: 'bg-[#7092BE]',       // Medium Denim
        heartColor: 'text-[#7092BE]',
        textColor: 'text-gray-700',
        headerColor: 'text-[#6685A4]',        // Dusty Slate Blue
        dayNamesColor: 'text-[#7092BE]',
        background: 'bg-[#94AFC3]',           // Muted Steel Blue
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-[#94AFC3]',            // Muted Steel Blue
        garden: 'bg-[#94AFC3]',
    },

    // Custom CSS Variables
    cssVariables: {
        '--primary-bg': '#111827',
        '--secondary-bg': '#1f2937',
        '--accent-bg': '#6685A4',             // Dusty Slate Blue - strong accents
        '--accent-hover': '#2F4869',
        '--primary-text': '#6685A4',          // Dusty Slate Blue - headings
        '--secondary-text': '#d1d5db',
        '--accent-text': '#7092BE',           // Medium Denim - motif
        '--muted-text': '#9ca3af',
        '--border-color': '#7092BE',
        '--custom-theme': '#7092BE',
        '--cerulean': '#7092BE',
        '--powder-blue': '#94AFC3',
        '--royal-azure': '#6685A4',
        '--ivory': '#FFFFF0',
        '--beige': '#F5F5DC',
        '--brown': '#8B4513',
        '--garden-bg': '#94AFC3',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-[#7092BE]',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-[#7092BE]',
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
            primary: 'bg-[#94AFC3]',
            secondary: 'bg-white',
            accent: 'bg-[#6685A4]',
            theme: 'bg-[#94AFC3]',
        },
        text: {
            primary: 'text-[#6685A4]',
            secondary: 'text-gray-700',
            accent: 'text-[#7092BE]',
            garden: 'text-[#7092BE]',
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
