import { Injectable, inject } from '@angular/core';

export interface AppError {
  message: string;
  code?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: unknown): AppError {
    const timestamp = new Date();
    
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
        timestamp,
      };
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return {
        message: String(error.message),
        code: 'code' in error ? String(error.code) : 'UNKNOWN_ERROR',
        timestamp,
      };
    }

    return {
      message: 'Ha ocurrido un error inesperado',
      code: 'UNKNOWN_ERROR',
      timestamp,
    };
  }

  logError(error: unknown): void {
    const appError = this.handleError(error);
    console.error('[Error]', {
      ...appError,
      originalError: error,
    });
  }
}
