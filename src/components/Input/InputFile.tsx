import React, { forwardRef, useCallback, useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '../icons'
import { IconType } from '../../types/icon'
import { 
  BaseInputProps, 
  InputWrapper 
} from './Input'

export interface FileValidation {
  maxSize?: number // in bytes
  minSize?: number // in bytes
  maxFiles?: number
  allowedTypes?: string[] // MIME types or extensions like '.pdf', '.jpg'
}

export interface InputFileProps extends Omit<BaseInputProps<File[]>, 'type' | 'value' | 'defaultValue' | 'placeholder'> {
  accept?: string
  multiple?: boolean
  validation?: FileValidation
  dragAndDrop?: boolean
  showPreview?: boolean
  previewSize?: 'sm' | 'md' | 'lg'
  value?: File[]
  defaultValue?: File[]
  onChange?: (files: File[], event?: React.ChangeEvent<HTMLInputElement> | DragEvent) => void
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(({
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  accept,
  multiple = false,
  validation,
  dragAndDrop = true,
  showPreview = true,
  previewSize = 'md',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  label,
  description,
  error,
  clearable = true,
  onClear,
  radius,
  ...props
}, ref) => {
  const [internalFiles, setInternalFiles] = useState<File[]>(
    value !== undefined ? value : (defaultValue !== undefined ? defaultValue : [])
  )
  const [isDragOver, setIsDragOver] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const currentFiles = isControlled ? value : internalFiles

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalFiles(value)
    }
  }, [value, isControlled])

  // Combine refs
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current)
      } else {
        ref.current = inputRef.current
      }
    }
  }, [ref])

  const validateFiles = useCallback((files: File[]): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!validation) return { valid: true, errors: [] }

    // Check max files
    if (validation.maxFiles && files.length > validation.maxFiles) {
      errors.push(`Maximum ${validation.maxFiles} files allowed`)
    }

    // Validate each file
    files.forEach((file) => {
      // Check file size
      if (validation.maxSize && file.size > validation.maxSize) {
        errors.push(`File "${file.name}" is too large (max: ${formatFileSize(validation.maxSize)})`)
      }
      
      if (validation.minSize && file.size < validation.minSize) {
        errors.push(`File "${file.name}" is too small (min: ${formatFileSize(validation.minSize)})`)
      }

      // Check file type
      if (validation.allowedTypes && validation.allowedTypes.length > 0) {
        const isAllowed = validation.allowedTypes.some((type: string) => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
          } else {
            return file.type.includes(type) || file.type === type
          }
        })
        
        if (!isAllowed) {
          errors.push(`File "${file.name}" type not allowed`)
        }
      }
    })

    return { valid: errors.length === 0, errors }
  }, [validation])

  const handleFiles = useCallback((files: File[], event?: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    const { valid, errors } = validateFiles(files)
    
    setValidationErrors(errors)
    
    if (valid) {
      if (!isControlled) {
        setInternalFiles(files)
      }
      onChange?.(files, event)
    }
  }, [isControlled, onChange, validateFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files, e)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && dragAndDrop) {
      setIsDragOver(true)
    }
  }, [disabled, dragAndDrop])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    if (disabled || !dragAndDrop) return

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files, e as any)
  }, [disabled, dragAndDrop, handleFiles])

  const handleClear = useCallback(() => {
    const emptyFiles: File[] = []
    if (!isControlled) {
      setInternalFiles(emptyFiles)
    }
    setValidationErrors([])
    onClear?.(emptyFiles)
    onChange?.(emptyFiles)
    
    // Clear the input
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [isControlled, onClear, onChange])

  const removeFile = useCallback((index: number) => {
    const newFiles = currentFiles.filter((_: File, i: number) => i !== index)
    handleFiles(newFiles)
  }, [currentFiles, handleFiles])

  const openFileDialog = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return null
  }

  const getFileIcon = (file: File): IconType => {
    if (file.type.startsWith('image/')) return IconType.IMAGE
    if (file.type.includes('pdf')) return IconType.FILE_TEXT
    if (file.type.includes('video/')) return IconType.VIDEO
    if (file.type.includes('audio/')) return IconType.MUSIC
    if (file.type.includes('text/') || file.type.includes('json')) return IconType.FILE_TEXT
    return IconType.FILE
  }

  const previewSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  }

  const dropzoneClasses = cn(
    // Base styles
    'relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200',
    'hover:border-blue-400 hover:bg-blue-50/50',
    
    // Variant styles
    variant === 'default' && 'border-gray-300',
    variant === 'filled' && 'border-gray-300 bg-gray-50',
    
    // State styles
    isDragOver && 'border-blue-500 bg-blue-50',
    disabled && 'opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent',
    (error || validationErrors.length > 0) && 'border-red-300 hover:border-red-400',
    
    // Size styles
    size === 'sm' && 'p-4',
    size === 'lg' && 'p-8',
    
    className
  )

  const allErrors = [
    ...(error ? [error] : []),
    ...validationErrors
  ]

  return (
    <InputWrapper
      label={label}
      description={description}
      error={allErrors.length > 0 ? allErrors.join(', ') : undefined}
      required={required}
      disabled={disabled}
      size={size}
      clearable={clearable && currentFiles.length > 0}
      onClear={handleClear}
      radius={radius}
    >
      <div className="space-y-4">
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className="hidden"
          {...props}
        />

        {/* Drop zone */}
        <div
          className={dropzoneClasses}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center space-y-2">
            <Icon 
              type={IconType.UPLOAD} 
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} 
              className={cn(
                'text-gray-400',
                isDragOver && 'text-blue-500'
              )} 
            />
            
            <div className="text-sm text-gray-600">
              {currentFiles.length > 0 ? (
                <span>Click to select {multiple ? 'more files' : 'a different file'}</span>
              ) : (
                <span>
                  {dragAndDrop ? 'Drop files here or ' : ''}
                  <span className="font-medium text-blue-600">browse</span>
                </span>
              )}
            </div>
            
            {accept && (
              <div className="text-xs text-gray-500">
                Accepted: {accept}
              </div>
            )}
            
            {validation && (
              <div className="text-xs text-gray-500">
                {validation.maxSize && `Max size: ${formatFileSize(validation.maxSize)}`}
                {validation.maxFiles && ` • Max files: ${validation.maxFiles}`}
              </div>
            )}
          </div>
        </div>

        {/* File list */}
        {currentFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">
              Selected Files ({currentFiles.length})
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {currentFiles.map((file: File, index: number) => {
                const preview = getFilePreview(file)
                
                return (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {/* Preview/Icon */}
                    <div className={cn('flex-shrink-0', previewSizeClasses[previewSize as keyof typeof previewSizeClasses])}>
                      {showPreview && preview ? (
                        <img
                          src={preview}
                          alt={file.name}
                          className={cn(
                            'object-cover rounded',
                            previewSizeClasses[previewSize as keyof typeof previewSizeClasses]
                          )}
                          onLoad={() => URL.revokeObjectURL(preview)}
                        />
                      ) : (
                        <div className={cn(
                          'flex items-center justify-center rounded bg-gray-200',
                          previewSizeClasses[previewSize as keyof typeof previewSizeClasses]
                        )}>
                          <Icon 
                            type={getFileIcon(file)} 
                            className="text-gray-500" 
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(index)
                      }}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      disabled={disabled}
                    >
                      <Icon type={IconType.CLOSE} size="sm" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </InputWrapper>
  )
})

InputFile.displayName = 'InputFile'