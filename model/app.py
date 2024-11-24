from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('stopwords')
nltk.download('punkt')
import pickle

app = Flask(__name__)
CORS(app)

@app.route('/find_similarity', methods=['POST'])
def find_similarity():
    user_data = request.json['user_data']
    
    df = pickle.load(open('df.pkl', 'rb'))
    
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['tokens'])
    
    user_str = ''
    for i in user_data:
        user_str += i['text']
    
    user_vector = tfidf_vectorizer.transform([user_str])
    similarities = cosine_similarity(user_vector, tfidf_matrix)
    most_similar_index = similarities.argmax()

    return jsonify({'id': df['_id'][most_similar_index]})

if __name__ == '__main__':
    app.run(debug=True, port=8888)
