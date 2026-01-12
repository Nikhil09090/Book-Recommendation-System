# Book-Recommendation-System
//code
import numpy as np
import pandas as pd

books = pd.read_csv('books.csv.zip')
users = pd.read_csv('users.csv.zip')
ratings = pd.read_csv('ratings.csv.zip')

books.head()

users.head()

ratings.head()

print(books.shape)
print(ratings.shape)
print(users.shape)

books.isnull().sum()

users.isnull().sum()

ratings.isnull().sum()

books.duplicated().sum()

ratings.duplicated().sum()

users.duplicated().sum()

# Popularity Based Recommendation System 

ratings.merge(books,on='ISBN')

ratings.merge(books,on='ISBN').shape

ratings_with_name = ratings.merge(books,on='ISBN')

ratings_with_name

ratings_with_name = ratings.merge(books,on='ISBN')

ratings_with_name.groupby('Book-Title').count()

ratings_with_name.groupby('Book-Title').count()['Book-Rating']

ratings_with_name.groupby('Book-Title').count()['Book-Rating'].reset_index()

num_rating_df = ratings_with_name.groupby('Book-Title').count()['Book-Rating'].reset_index()
num_rating_df.rename(columns={'Book-Ratings':'num_ratings'})

num_rating_df = ratings_with_name.groupby('Book-Title').count()['Book-Rating'].reset_index()
num_rating_df.rename(columns={'Book-Rating':'num_ratings'},inplace=True)
num_rating_df

ratings_with_name['Book-Rating'] = pd.to_numeric(ratings_with_name['Book-Rating'], errors='coerce')
avg_rating_df = ratings_with_name.groupby('Book-Title')['Book-Rating'].mean().reset_index()
avg_rating_df.rename(columns={'Book-Rating': 'avg_rating'}, inplace=True)
avg_rating_df


popular_df = num_rating_df.merge(avg_rating_df,on='Book-Title')
popular_df


popular_df = popular_df[popular_df['num_ratings']>=250].sort_values('avg_rating',ascending=False).head(50)

popular_df = popular_df.merge(books,on='Book-Title').drop_duplicates('Book-Title')[['Book-Title','Book-Author','Image-URL-M','num_ratings','avg_rating']]


popular_df['Image-URL-M'][0]


x = ratings_with_name.groupby('User-ID').count()['Book-Rating'] > 200
padhe_likhe_users = x[x].index

filtered_rating = ratings_with_name[ratings_with_name['User-ID'].isin(padhe_likhe_users)]


y = filtered_rating.groupby('Book-Title').count()['Book-Rating']>=50
famous_books = y[y].index

final_ratings = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]


pt = final_ratings.pivot_table(index='Book-Title',columns='User-ID',values='Book-Rating')


pt.fillna(0,inplace=True)
pt



from sklearn.metrics.pairwise import cosine_similarity


similarity_scores = cosine_similarity(pt)


similarity_scores.shape


def recommend(book_name):
    # index fetch
    index = np.where(pt.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        
        data.append(item)
    
    return data


recommend('1984')


pt.index[545]

import pickle
pickle.dump(popular_df,open('popular.pkl','wb'))

books.drop_duplicates('Book-Title')

pickle.dump(pt,open('pt.pkl','wb'))
pickle.dump(books,open('books.pkl','wb'))
pickle.dump(similarity_scores,open('similarity_scores.pkl','wb'))
