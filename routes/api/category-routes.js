const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCatbyID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!getCatbyID) {
      res.status(404).json({ message: 'No Category by that ID!' });
    }

    res.status(200).json(getCatbyID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const addCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(addCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCatId = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        },

      });
    res.status(200).json(updatedCatId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy(
      
    {
        where: {
          id: req.params.id
        },

      });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
