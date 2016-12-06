
/*
 * GET users listing.
 */

module.exports = (queueService, queueName) => {

  return {

    list : function(req, res){
      res.send("respond with a resource");
    },

    post : (req, res, next) => {
      queueService.createMessage(queueName, JSON.stringify({id: req.param.id, type: 'join'}), e => {
        console.log('join post error');
        console.log(e);
      });
      res.send("Create queue");
    },

    get : (req, res, next) => {
      queueService.getMessage(queueName, (e,msg) => {
        if (e) {
          console.log('join get error');
          console.log(e);
        } else {
          if (msg) {
            queueService.deleteMessage(queueName, msg.messageId, msg.popReceipt, e => {
              if (!e) {
                console.log("Deleted");
              }
            });
            res.send(msg);
          } else {
            res.status(404).send("Empty");
          }
        }
      });
    }
  };
};
