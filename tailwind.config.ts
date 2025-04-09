
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				twitch: {
					"50": "#f5f3ff",
					"100": "#ede8ff",
					"200": "#dcd6ff",
					"300": "#c3b5ff",
					"400": "#a487f5", // Purple-ish similar to Twitch
					"500": "#9b87f5", // Main Twitch purple
					"600": "#7E69AB", // Darker Twitch purple
					"700": "#6E59A5", // Even darker purple
					"800": "#1A1F2C", // Dark background
					"900": "#221F26", // Very dark background
				},
				neon: {
					orange: "#F97316", // Bright orange
					pink: "#D946EF", // Magenta pink
					blue: "#1EAEDB", // Bright blue
					green: "#10B981", // Emerald green
					yellow: "#FBBF24", // Amber yellow
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.5 },
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'70%': { transform: 'scale(1.05)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px 2px rgba(155, 135, 245, 0.3)' },
					'50%': { boxShadow: '0 0 15px 5px rgba(155, 135, 245, 0.6)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'pop': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'40%': { transform: 'scale(1.02)', opacity: '0.8' },
					'60%': { transform: 'scale(0.98)', opacity: '0.9' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'twitch-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(155, 135, 245, 0)' },
					'50%': { boxShadow: '0 0 0 8px rgba(155, 135, 245, 0.3)' },
				},
				'ripple': {
					'0%': { boxShadow: '0 0 0 0 rgba(155, 135, 245, 0.3)' },
					'100%': { boxShadow: '0 0 0 16px rgba(155, 135, 245, 0)' },
				},
				'confetti': {
					'0%': { transform: 'rotateZ(0deg) translateY(0)' },
					'100%': { transform: 'rotateZ(360deg) translateY(1000%)' },
				},
				'backdrop-blur-in': {
					'0%': { backdropFilter: 'blur(0px)' },
					'100%': { backdropFilter: 'blur(8px)' },
				},
				'levitate': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-5px) rotate(2deg)' },
					'75%': { transform: 'translateY(5px) rotate(-2deg)' },
				},
				'heartbeat': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.15)' },
				},
				'color-cycle': {
					'0%, 100%': { color: 'rgba(155, 135, 245, 1)' },
					'33%': { color: 'rgba(217, 70, 239, 1)' },
					'66%': { color: 'rgba(249, 115, 22, 1)' },
				},
				'rotate-3d': {
					'0%': { transform: 'perspective(500px) rotateY(0deg)' },
					'100%': { transform: 'perspective(500px) rotateY(360deg)' },
				},
				'ripple-ping': {
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: '0',
					},
				},
				'explosive-appear': {
					'0%': { 
						transform: 'scale(0) rotate(12deg)',
						opacity: '0',
						filter: 'blur(4px)'
					},
					'60%': { 
						transform: 'scale(1.2) rotate(-3deg)',
						opacity: '1',
						filter: 'blur(0px)'
					},
					'100%': { 
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'slide-in': 'slide-in 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'bounce-in': 'bounce-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'pop': 'pop 0.4s ease-out',
				'twitch-pulse': 'twitch-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'ripple': 'ripple 1s ease-out',
				'confetti-1': 'confetti 3s ease-out infinite',
				'confetti-2': 'confetti 2s ease-out infinite',
				'confetti-3': 'confetti 2.5s ease-out infinite',
				'backdrop-blur-in': 'backdrop-blur-in 0.3s ease-out forwards',
				'levitate': 'levitate 6s ease-in-out infinite',
				'heartbeat': 'heartbeat 1s ease-in-out infinite',
				'color-cycle': 'color-cycle 6s linear infinite',
				'rotate-3d': 'rotate-3d 5s linear infinite',
				'ripple-ping': 'ripple-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
				'explosive-appear': 'explosive-appear 0.6s ease-out forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'twitch-gradient': 'linear-gradient(135deg, #9b87f5 0%, #D946EF 100%)',
				'sidebar-gradient': 'linear-gradient(180deg, rgba(26,31,44,0.8) 0%, rgba(34,31,38,1) 100%)',
				'card-gradient': 'linear-gradient(to bottom right, rgba(30,35,48,0.5), rgba(26,31,44,0.8))',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
				'button-gradient': 'linear-gradient(135deg, #9b87f5 0%, #8A7EDA 100%)',
				'featured-gradient': 'linear-gradient(to bottom, rgba(26,31,44,0) 0%, rgba(26,31,44,1) 100%)',
				'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 30 30\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z\' fill=\'rgba(155,135,245,0.07)\'/%3E%3C/svg%3E")',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			boxShadow: {
				'neon-glow': '0 0 5px rgba(155, 135, 245, 0.7), 0 0 20px rgba(155, 135, 245, 0.3)',
				'neon-pink': '0 0 5px rgba(217, 70, 239, 0.7), 0 0 20px rgba(217, 70, 239, 0.3)',
				'neon-orange': '0 0 5px rgba(249, 115, 22, 0.7), 0 0 20px rgba(249, 115, 22, 0.3)',
				'neon-blue': '0 0 5px rgba(30, 174, 219, 0.7), 0 0 20px rgba(30, 174, 219, 0.3)',
			},
			textShadow: {
				'neon': '0 0 5px rgba(155, 135, 245, 0.7), 0 0 20px rgba(155, 135, 245, 0.3)',
				'glow': '0 0 2px rgba(255, 255, 255, 0.3)',
			},
			transitionTimingFunction: {
				'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'elastic': 'cubic-bezier(0.4, 0.0, 0.2, 1.5)',
			},
			gridTemplateColumns: {
				'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
				'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
				'auto-fill-300': 'repeat(auto-fill, minmax(300px, 1fr))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
