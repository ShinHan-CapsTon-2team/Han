import React, { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // WebGPU acceleration
import '@tensorflow/tfjs-backend-cpu'; // CPU fallback

class RandomFlipLayer extends tf.layers.Layer {
  constructor(config) {
    super(config);
  }

  // 레이어의 호출 메서드 오버라이드
  call(inputs, kwargs) {
    return tf.image.randomFlipLeftRight(inputs[0]);
  }

  // 필수 메서드 오버라이드
  computeOutputShape(inputShape) {
    return inputShape;
  }

  // 레이어의 이름을 반환하는 메서드
  static getClassName() {
    return 'RandomFlipLayer';
  }
}

const Example = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [predictedCategory, setPredictedCategory] = useState('');

    const modelRef = useRef(null);

    tf.serialization.registerClass(RandomFlipLayer);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    const handleImageClassification = async () => {
        if (!modelRef.current) {
          try {
            // 모델 로드
            const model = await tf.loadLayersModel('./model_tfjs/model.json');
            modelRef.current = model;
          } catch (error) {
            console.error('Error loading model:', error);
            return;
          }
     }

     if (!previewImage) {
        console.error('No image to classify');
        return;
      }

    const imageElement = document.createElement('img');
    imageElement.onload = async () => {
      const preprocessedImage = preprocessImage(imageElement);
      const prediction = modelRef.current.predict(preprocessedImage);
      const predictedCategory = "your_category_list"[prediction.argMax().dataSync()[0]];
      setPredictedCategory(predictedCategory);
    };

     imageElement.src = previewImage;
    };

    const preprocessImage = (image) => {
        const tensor = tf.browser.fromPixels(image);
        const expandedTensor = tensor.expandDims(0).toFloat();
        const preprocessedTensor = expandedTensor.div(255.0);
        return preprocessedTensor;
      };


  return (
    <div>
    <input type="file" onChange={handleImageChange} />
    {previewImage && <img src={previewImage} alt="Preview" />}
    <button onClick={handleImageClassification}>이미지 분류</button>
    {predictedCategory && <p>분류된 카테고리: {predictedCategory}</p>}
  </div>
  );
};

export default Example;
