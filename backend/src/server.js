import express from 'express'
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';



const app = express();

app.use(bodyParser.json()); /*parses the json object and adds a body property to the request perameter of whatever the matching route is*/

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('my-blog')

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}
app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    }, res);
})

app.post('/api/articles/:name/upvote', async (req, res) => {
   withDB(async (db) => {
    const articleName = req.params.name;

       

        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        await db.collection('articles').updateOne({ name: articleName}, {
            '$set': {/*second argument updates I want to apply to the object*/
                upvotes: articleInfo.upvotes + 1, /*object with the changes I want to make*/
            },
        })
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName })

        res.status(200).json(updatedArticleInfo);/*send updated info to the client*/
    }, res);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text })
            },
        })
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
})

app.listen(8000, () => console.log('Listening on port 8000'));