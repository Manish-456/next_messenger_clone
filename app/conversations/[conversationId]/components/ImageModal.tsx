'use client';
import Modal from '@/app/components/Modal';
import Image from 'next/image';
import React, { FC } from 'react'
interface ImageModalProps {
    src? : string | null,
    isOpen : boolean,
    onClose : () => void
}
const ImageModal : FC<ImageModalProps> = ({
    src ,
    isOpen,
    onClose
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} >
        <div className="h-80 w-80">
            <Image src={src || ""} fill alt='image' className='object-cover' />
        </div>
            
    </Modal>
  )
}

export default ImageModal
