import tensorflow as tf
import os
import numpy as np
import matplotlib.pyplot as plt

# Define dataset directory
dataset_dir = "backend/IMG_CLASSES"

# Load dataset using TensorFlow
img_size = (224, 224)  # Standard size for CNNs
batch_size = 32

train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    dataset_dir,
    image_size=img_size,
    batch_size=batch_size,
    shuffle=True,
    label_mode='int'  # Set label_mode as 'int' to get integer labels for classification
)

# Check class names
class_names = train_dataset.class_names
print("Classes:", class_names)

# Show sample images
plt.figure(figsize=(10, 5))
for images, labels in train_dataset.take(1):  
    for i in range(5):
        plt.subplot(1, 5, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")
plt.show()

# Split the dataset into training and validation sets (80/20 split)
val_size = int(0.2 * len(train_dataset))
train_size = len(train_dataset) - val_size

train_dataset = train_dataset.take(train_size)
val_dataset = train_dataset.skip(train_size)

# Prefetch data for performance
AUTOTUNE = tf.data.experimental.AUTOTUNE
train_dataset = train_dataset.cache().prefetch(buffer_size=AUTOTUNE)
val_dataset = val_dataset.cache().prefetch(buffer_size=AUTOTUNE)

# Build the model (Convolutional Neural Network)
model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1./255, input_shape=(224, 224, 3)),  # Normalize pixel values to [0,1]
    
    tf.keras.layers.Conv2D(32, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    
    tf.keras.layers.Conv2D(64, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    
    tf.keras.layers.Conv2D(128, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(len(class_names), activation='softmax')  # Output layer for classification
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
history = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=10  # You can increase epochs if you need more training
)

# Save the model to disk
model.save("backend/skin_disease_model.h5")
print("Model saved to 'backend/skin_disease_model.h5'")

# Optionally, plot the training and validation accuracy/loss
plt.figure(figsize=(10, 5))

# Plot training & validation accuracy values
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(['Train', 'Test'], loc='upper left')

# Plot training & validation loss values
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend(['Train', 'Test'], loc='upper left')

plt.show()
