Handle& Handle::operator = (const Handle& other) {
    other._body->Ref();
    _body->Unref();
    
    if (_body->RefCount() == 0) {
        delete _body;
    }
    
    _body = other._body;
    
    return *this;
}
