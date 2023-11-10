#!/usr/bin/env python
# coding: utf-8

# In[1]:


print("Let's get started with stock market prediction using the following techniques")

print('''Linear Regression (LR),
Adaptive Boost (AdaBoost), 
k-Nearest Neighbors (kNN), 
Random Forest (RF), 
Decision Trees (DT)''')


# In[2]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import plotly.graph_objs as go

from plotly.offline import plot,iplot,init_notebook_mode
init_notebook_mode(connected=True)


# # Read CSV

# In[3]:


df=pd.read_csv("RELIANCE.csv")
df.head()


# # Cleaning the data

# In[4]:


#Dropping waste columns using drop function
df.drop(columns=['Series','Last','VWAP','Volume','Turnover','Trades','Deliverable Volume','%Deliverble'],inplace=True)


# In[5]:


df.head()


# In[6]:


#Converting the date column to date time format in pandas
df['Date']=pd.to_datetime(df.Date)


# In[7]:


df.head()


# In[8]:


#Check for null values
df.isnull().sum()


# In[9]:


df.info()


# In[10]:


df.shape


# In[11]:


df.describe()


# # Visualizing the data

# In[12]:


df[['Open','Close','High','Low','Prev Close']].plot(kind='box')


# In[13]:


#Get graph just like the stock price in google
layout=go.Layout(
    title="Stock Behaviour",
    xaxis=dict(
        title="Date"
    ),
    yaxis=dict(
        title="Open Price"
    )
)

stock_data=[{'x':df['Date'],'y':df['Close']}]

plot=go.Figure(data=stock_data,layout=layout)
iplot(plot)


# # Regression Model

# In[14]:


#For modelling
from sklearn.model_selection import train_test_split

#For Preprocessing
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

#Model Evaluation
from sklearn.metrics import mean_squared_error as mse
from sklearn.metrics import r2_score


# In[15]:


X=np.array(df.index).reshape(-1,1)
Y=df['Close']


# In[16]:


X_train,X_test,Y_train,Y_test=train_test_split(X,Y,test_size=0.2,random_state=10)


# In[17]:


scaler=StandardScaler().fit(X_train)


# In[18]:


from sklearn.linear_model import LinearRegression


# In[19]:


lr=LinearRegression()
lr.fit(X_train,Y_train)


# In[21]:


actual=go.Scatter(
    x=X_train.T[0],
    y=Y_train,
    mode='markers',
    name="Actual Stock Price"
)

predict=go.Scatter(
    x=X_train.T[0],
    y=lr.predict(X_train).T,
    mode='lines',
    name="Predicted Stock Price"
)


# In[22]:


stock_data=[actual,predict]
layout.xaxis.title.text="Day"
plot2=go.Figure(data=stock_data,layout=layout)
iplot(plot2)


# # Model Accuracy / Score

# In[23]:


#R2 Score (1-> accurate , 0-> same result , <0 -> worse)
r2_train = r2_score(Y_train,lr.predict(X_train))
r2_test  = r2_score(Y_test,lr.predict(X_test))

print("Training R2 -> ",r2_train)
print("Testing R2 -> ",r2_test)

#Refer this for R2 -> https://www.geeksforgeeks.org/python-coefficient-of-determination-r2-score/


# In[24]:


#MSE Score (Should be as low as possible i.e near to 0 for higest accuracy)
mse_train = mse(Y_train,lr.predict(X_train))
mse_test  = mse(Y_test,lr.predict(X_test))

print("Training MSE -> ",mse_train)
print("Testing MSE -> ",mse_test)

# MSE -> https://stephenallwright.com/good-mse-value/


# # Conclusion

# In[25]:


#Not giving accurate results


# # AdaBoost Algorithm

# In[26]:


from sklearn.ensemble import AdaBoostRegressor


# In[27]:


# Create adaboost classifer object
adaboost = AdaBoostRegressor()
# Train Adaboost Classifer
model = adaboost.fit(X_train, Y_train)
#Predict the response for test dataset
y_pred_ada = model.predict(X_test)
y_pred_ada


# In[29]:


actual_ada=go.Scatter(
    x=X_train.T[0],
    y=Y_train,
    mode='markers',
    name="Actual Stock Price"
)

predict_ada=go.Scatter(
    x=X_train.T[0],
    y=adaboost.predict(X_train).T,
    mode='markers',
    name="Predicted Stock Price"
)


# In[30]:


stock_data_ada=[actual_ada,predict_ada]
layout.xaxis.title.text="Day"
plot3=go.Figure(data=stock_data_ada,layout=layout)
iplot(plot3)


# In[31]:


#R2 Score (1-> accurate , 0-> same result , <0 -> worse)
r2_train = r2_score(Y_train,adaboost.predict(X_train))
r2_test  = r2_score(Y_test,adaboost.predict(X_test))

print("Training R2 -> ",r2_train)
print("Testing R2 -> ",r2_test)


# In[32]:


#MSE Score (Should be as low as possible i.e near to 0 for higest accuracy)
mse_train = mse(Y_train,adaboost.predict(X_train))
mse_test  = mse(Y_test,adaboost.predict(X_test))

print("Training MSE -> ",mse_train)
print("Testing MSE -> ",mse_test)


# # Conclusion
# 

# In[4]:


#Not accurate algorithm


# In[8]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import plotly.graph_objs as go

from plotly.offline import plot,iplot,init_notebook_mode
init_notebook_mode(connected=True)

#Dropping waste columns using drop function
df=pd.read_csv("RELIANCE.csv")
df.drop(columns=['Series','Last','VWAP','Volume','Turnover','Trades','Deliverable Volume','%Deliverble'],inplace=True)
df['Date']=pd.to_datetime(df.Date)

#For modelling
from sklearn.model_selection import train_test_split

#For Preprocessing
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

#Model Evaluation
from sklearn.metrics import mean_squared_error as mse
from sklearn.metrics import r2_score


X=np.array(df.index).reshape(-1,1)
Y=df['Close']
X_train,X_test,Y_train,Y_test=train_test_split(X,Y,test_size=0.2,random_state=10)
scaler=StandardScaler().fit(X_train)

from sklearn.linear_model import LinearRegression

lr=LinearRegression()
lr.fit(X_train,Y_train)

actual=go.Scatter(
    x=X_train.T[0],
    y=Y_train,
    mode='markers',
    name="Actual Stock Price"
)

predict=go.Scatter(
    x=X_train.T[0],
    y=lr.predict(X_train).T,
    mode='lines',
    name="Predicted Stock Price"
)

stock_data=[actual,predict]
layout.xaxis.title.text="Day"
plot2=go.Figure(data=stock_data,layout=layout)
iplot(plot2)

import pickle


# In[ ]:




