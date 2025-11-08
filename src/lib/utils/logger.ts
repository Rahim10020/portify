// Logger centralisé pour Portify

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    level: LogLevel;
    message: string;
    data?: any;
    timestamp: Date;
    userId?: string;
}

class Logger {
    private logs: LogEntry[] = [];
    private maxLogs = 100;

    private log(level: LogLevel, message: string, data?: any, userId?: string) {
        const entry: LogEntry = {
            level,
            message,
            data,
            timestamp: new Date(),
            userId,
        };

        this.logs.push(entry);

        // Garder seulement les derniers logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // En développement, afficher dans la console
        if (process.env.NODE_ENV === 'development') {
            const styles = {
                info: 'color: #3B82F6',
                warn: 'color: #F59E0B',
                error: 'color: #EF4444',
                debug: 'color: #8B5CF6',
            };

            console.log(
                `%c[${level.toUpperCase()}] ${message}`,
                styles[level],
                data || ''
            );
        }

        // En production, envoyer à un service de monitoring (optionnel)
        if (process.env.NODE_ENV === 'production' && level === 'error') {
            this.sendToMonitoring(entry);
        }
    }

    private sendToMonitoring(entry: LogEntry) {
        // TODO: Intégrer avec Sentry, LogRocket, etc.
        // Exemple avec fetch vers un endpoint de logging
        /*
        fetch('/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
        }).catch(() => {
            // Échec silencieux pour éviter les boucles infinies
        });
        */
    }

    info(message: string, data?: any, userId?: string) {
        this.log('info', message, data, userId);
    }

    warn(message: string, data?: any, userId?: string) {
        this.log('warn', message, data, userId);
    }

    error(message: string, error?: any, userId?: string) {
        const errorData = error instanceof Error
            ? { message: error.message, stack: error.stack }
            : error;

        this.log('error', message, errorData, userId);
    }

    debug(message: string, data?: any, userId?: string) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, data, userId);
        }
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

export const logger = new Logger();

// Helper pour wrapper les fonctions async avec gestion d'erreur
export async function withErrorHandling<T>(
    fn: () => Promise<T>,
    errorMessage: string,
    userId?: string
): Promise<T | null> {
    try {
        return await fn();
    } catch (error) {
        logger.error(errorMessage, error, userId);
        return null;
    }
}

// Hook React pour capturer les erreurs
export function useErrorBoundary() {
    if (typeof window !== 'undefined') {
        window.addEventListener('error', (event) => {
            logger.error('Uncaught error', {
                message: event.error?.message,
                stack: event.error?.stack,
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            logger.error('Unhandled promise rejection', {
                reason: event.reason,
            });
        });
    }
}