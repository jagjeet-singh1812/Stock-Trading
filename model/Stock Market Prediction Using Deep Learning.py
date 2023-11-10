#!/usr/bin/env python
# coding: utf-8

# In[46]:


# pip install pandas
# !pip install matplotlib
# !pip install numpy
# !pip install scikit-learn
# !pip install tensorflow


# In[41]:


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.preprocessing import MinMaxScaler


# In[47]:


# df=pd.read_csv('RELIANCE.csv')
df=pd.read_csv('HDFCBANK.csv')
df.head()
# df.info()


# In[49]:


df1=df.reset_index()['Close']
df1
plt.plot(df1)


# In[50]:


scaler=MinMaxScaler(feature_range=(0,1))
df1=scaler.fit_transform(np.array(df1).reshape(-1,1))
df1


# In[51]:


training_size=int(len(df1)*0.7) #70% in training and 30% in testing
test_size=len(df1)-training_size
train_data,test_data=df1[0:training_size,:],df1[training_size:len(df1),:1]


# In[52]:


training_size,test_size


# In[53]:


def create_dataset(dataset, time_step=10):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        a = dataset[i:(i+time_step), 0]   ###i=0,1,2,3-----99   100 
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)


# In[54]:


time_step = 100
X_train, y_train = create_dataset(train_data, time_step)
X_test, ytest = create_dataset(test_data, time_step)
print(X_train.shape)
print(y_train.shape)
print(X_test.shape)
print(ytest.shape)


# In[55]:


X_train =X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)
X_test = X_test.reshape(X_test.shape[0],X_test.shape[1] , 1)
X_train
X_test


# In[56]:


from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM


# In[57]:


model=Sequential()
model.add(LSTM(50,return_sequences=True,input_shape=(100,1))) #50 memory units
model.add(LSTM(50,return_sequences=True))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(loss='mean_squared_error',optimizer='adam')
#recurrent neural network with three LSTM layers,
#where the first two LSTM layers return sequences, 
#and the final LSTM layer is followed by a dense layer with a single output neuron for making predictions


# In[58]:


model.summary()


# In[74]:


model.fit(X_train,y_train,validation_data=(X_test,ytest),epochs=100,batch_size=1000,verbose=1)
#epochs-> The number of epochs is a hyperparameter that defines the number times that the learning algorithm will work through the entire training dataset.
#batch_size->It defines the number of samples that will be propagated through the network at once.


# In[75]:


import tensorflow as tf
tf.__version__


# In[76]:


### Lets Do the prediction and check performance metrics
train_predict=model.predict(X_train)
test_predict=model.predict(X_test)

##Transformback to original form , minmax scaler kiya tha upar , ab ulta karenge
train_predict=scaler.inverse_transform(train_predict)
test_predict=scaler.inverse_transform(test_predict)

### Calculate RMSE(root mean square) performance metrics
import math
from sklearn.metrics import mean_squared_error
math.sqrt(mean_squared_error(y_train,train_predict))


# In[77]:


math.sqrt(mean_squared_error(ytest,test_predict))


# In[78]:


look_back=100
trainPredictPlot = np.empty_like(df1)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[look_back:len(train_predict)+look_back, :] = train_predict
# shift test predictions for plotting
testPredictPlot = np.empty_like(df1)
testPredictPlot[:, :] = np.nan
testPredictPlot[len(train_predict)+(look_back*2)+1:len(df1)-1, :] = test_predict
# plot baseline and predictions
plt.plot(scaler.inverse_transform(df1))
plt.plot(trainPredictPlot)
plt.plot(testPredictPlot)
plt.show()


# In[79]:


len(test_data)


# In[80]:


x_input=test_data[1492:].reshape(1,-1)
x_input.shape


# In[81]:


temp_input=list(x_input)
temp_input=temp_input[0].tolist()

temp_input


# In[82]:


from numpy import array 
#next 30 days

lst_output=[]
n_steps=100
i=0
while(i<30):
    
    if(len(temp_input)>100):
        #print(temp_input)
        x_input=np.array(temp_input[1:])
        print("{} day input {}".format(i,x_input))
        x_input=x_input.reshape(1,-1)
        x_input = x_input.reshape((1, n_steps, 1))
        #print(x_input)
        yhat = model.predict(x_input, verbose=0)
        print("{} day output {}".format(i,yhat))
        temp_input.extend(yhat[0].tolist())
        temp_input=temp_input[1:]
        #print(temp_input)
        lst_output.extend(yhat.tolist())
        i=i+1
    else:
        x_input = x_input.reshape((1, n_steps,1))
        yhat = model.predict(x_input, verbose=0)
        print(yhat[0])
        temp_input.extend(yhat[0].tolist())
        print(len(temp_input))
        lst_output.extend(yhat.tolist())
        i=i+1
    

print(lst_output)


# In[83]:


day_new=np.arange(1,101)
day_pred=np.arange(101,131)
len(df1)


# In[84]:


import matplotlib.pyplot as plt
plt.plot(day_new,scaler.inverse_transform(df1[(len(df1)-100):]))
plt.plot(day_pred,scaler.inverse_transform(lst_output))


# In[89]:


df3=df1.tolist()
df3.extend(lst_output)
plt.plot(df3[5100:])


# In[88]:


df3=scaler.inverse_transform(df3).tolist()
flat_array = [item for row in df3 for item in row]
print(flat_array)
plt.plot(df3)


# In[ ]:




