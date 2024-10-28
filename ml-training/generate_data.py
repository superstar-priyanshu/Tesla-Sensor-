import pandas as pd
import numpy as np

# Generate synthetic data
data_size = 1000
data = {
    'temperature': np.random.normal(25, 5, data_size),
    'pressure': np.random.normal(1.2, 0.2, data_size),
    'vibration': np.random.normal(0.6, 0.1, data_size),
}

df = pd.DataFrame(data)

# Simulate failures
df['failure'] = np.where(
    (df['temperature'] > 30) & (df['vibration'] > 0.7), 1, 0
)

df.to_csv('training_data.csv', index=False)
