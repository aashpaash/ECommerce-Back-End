const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: Product
    } 
  );

} catch (err) {
  res.status(500).json(err);
}

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id,{
      include: Product
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json({alert:"Category not found"});
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Categoty.create(req.body)
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json({alert:"Category not created."})
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      req.body, {
        where: {id:req.params.id}
      }
    )
  } catch (err) {
    res.status(400).json({alert:"Category not updated"})
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
  } catch (err) {
    res.status(400).json({alert:"Category not deleted by its id"})
  }
});

module.exports = router;
