import { Dispatch, SetStateAction } from 'react';
import styles from './InputFile.module.scss';

type propsTypes = {
  uploadedImage: File | null;
  setUploadedImage:Dispatch<SetStateAction<File | null>>
  name: string;
};

const InputFile = (props: propsTypes) => {
    const { uploadedImage, setUploadedImage, name } = props;
  return (
    <div className={styles.file}>
      <label className={styles.file__label} htmlFor={name}>
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>Upload a new image larger than 200x200</p>
            <p>
              maximum size <b>1 mb</b>
            </p>
          </>
        )}
      </label>
      <input
        className={styles.file__input}
        type="file"
        name="image"
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;